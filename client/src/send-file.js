const { request } = require("http")

const createSendFileStream = (filePath, host = "http://localhost:8000/") =>
	request(host, {
		method: "POST",
		headers: { "file-path": filePath },
	})

module.exports = {
	createSendFileStream,
}
