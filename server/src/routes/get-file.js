const { join } = require("path")
const { createReadStream } = require("fs")

const getFile = (req, res) => {
	const filePath = join(__dirname, "../../../files", req.url)

	res.setHeader("content-encoding", "gzip")
	res.setHeader("content-type", "text/html")

	const readStream = createReadStream(filePath)

	readStream
		.on("error", () => {
			res.statusCode = 404
			res.end()
		})
		.pipe(res)
}

module.exports = {
	getFile,
}
