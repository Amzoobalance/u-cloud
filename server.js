const { createServer } = require("http");
const { createReadStream } = require("fs");

const indexHtmlStream = createReadStream("./index.html");

const server = createServer();

server.on("request", (request, response) => {
  indexHtmlStream.pipe(response);
});

server.listen(8000);
console.log("Server running on port 8000");
