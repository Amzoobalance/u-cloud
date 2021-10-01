const { createServer } = require("http");
const { join } = require("path");
const { createWriteStream, createReadStream } = require("fs");
const { PORT } = process.env;

const server = createServer((req, res) => {
  if (req.method === "GET") {
    const filePath = join(__dirname, req.url);

    res.setHeader("content-encoding", "gzip");
    res.setHeader("content-type", "text/html");

    const readStream = createReadStream(filePath);

    readStream
      .on("error", () => {
        res.statusCode = 404;
        res.end();
      })
      .pipe(res);
  } else if (req.method === "POST") {
    const outputFilePath = req.headers["file-path"];

    const writeStream = createWriteStream(outputFilePath);

    req.pipe(writeStream).on("close", () => {
      res.write(`File saved as ${outputFilePath}`);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);

console.log(`Server running on port ${PORT}`);
