// TODO: a tool for copying files
const { createReadStream, createWriteStream, stat } = require("fs");
const { SingleBar, Presets } = require("cli-progress");
const { createGzip } = require("zlib");
const { request } = require("http");
const bar = new SingleBar({}, Presets.shades_classic);

const [sourseFilePath, outputFilePath] = process.argv.slice(2);

const readStream = createReadStream(sourseFilePath);

const gzipStream = createGzip();

stat(sourseFilePath, (error, stat) => {
  if (error !== null) {
    console.log(error.message);
    process.exit(1);
  }

  bar.start(stat.size, 0);

  if (process.argv.includes("--remote")) {
    const requestOptions = {
      method: "POST",
      headers: { "file-path": outputFilePath },
    };
    const req = request("http://localhost:8000/", requestOptions, (res) => {
      let responseBody = "";
      res
        .on("data", (chunk) => {
          responseBody += chunk.toString();
        })
        .on("close", () => {
          console.log(responseBody);
        });
    });

    readStream.pipe(
      gzipStream
        .on("data", (chunk) => {
          req.write(chunk);
          bar.increment(chunk.length);
        })
        .on("close", () => {
          req.end();

          bar.update(stat.size);
          bar.stop();
        })
    );
  } else {
    const writeStream = createWriteStream(outputFilePath);

    readStream
      .pipe(
        gzipStream.on("data", (chunk) => {
          writeStream.write(chunk);
          bar.increment(chunk.length);
        })
      )
      .on("close", () => {
        bar.update(stat.size);
        bar.stop();
      });
  }
});
