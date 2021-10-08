const { join } = require("path")
const { createReadStream } = require("fs")

const getFile = (req, res) => {
	const filePath = join(__dirname, "../..", req.url)

	res.setHeader("content-encoding", "gzip")
	res.setHeader("content-type", "text/html")

	const readStream = createReadStream(filePath)

	readStream.pipe(res).on("error", () => {
		res.statusCode = 404
		res.end()
	})
}

module.exports = {
	getFile,
}
