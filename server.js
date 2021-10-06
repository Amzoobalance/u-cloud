const { createServer } = require("http");
const { Router } = require("./src/router");
const { PORT } = process.env;
const { uploadFile } = require("./src/routes/upload-file");
const { getFile } = require("./src/routes/get-file");
const { defaultHandler } = require("./src/routes/default-handler");

const router = Router().all(defaultHandler).get(getFile).post(uploadFile);

const server = createServer(router.serve);

server.listen(PORT);

console.log(`Server running on port ${PORT}`);
