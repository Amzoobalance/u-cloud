// TODO: a tool for copying files
const { createReadStream, createWriteStream, stat } = require("fs");
const { SingleBar, Presets } = require("cli-progress");

const bar = new SingleBar({}, Presets.shades_classic);

const [sourseFilePath, outPuthFilePath] = process.argv.slice(2);

const readStream = createReadStream(sourseFilePath);
const writeStream = createWriteStream(outPuthFilePath);

stat(sourseFilePath, (error, stat) => {
  if (error !== null) {
    console.log(error.message);
    process.exit(1);
  }

  bar.start(stat.size, 0);

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
    bar.increment(chunk.length);
  });
  readStream.on("close", () => {
    bar.stop();
  });
});
