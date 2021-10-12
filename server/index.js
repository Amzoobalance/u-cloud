const { createServer } = require("http")
const { Router } = require("./src/router")
const { U_CLOUD_PORT } = process.env
const { uploadFile } = require("./src/routes/upload-file")
const { getFile } = require("./src/routes/get-file")
const { defaultHandler } = require("./src/routes/default-handler")

const router = Router().all(defaultHandler).get(getFile).post(uploadFile)

const server = createServer(router.serve)

server.listen(U_CLOUD_PORT)

console.log(`Server running on port ${U_CLOUD_PORT}`)
