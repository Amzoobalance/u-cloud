const { createServer } = require("http");
const { createWriteStream } = require("fs");

const { PORT } = process.env;

const server = createServer((req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 404;
    return res.end();
  }
  const outputFilePath = req.headers["file-path"];

  const writeStream = createWriteStream(outputFilePath);

  req.pipe(writeStream).on("close", () => {
    res.write(`File saved as ${outputFilePath}`);
    res.end();
  });
});

server.listen(PORT);

console.log(`Server running on port ${PORT}`);
