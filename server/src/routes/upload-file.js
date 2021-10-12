const { createWriteStream } = require("fs")
const { join } = require("path")

const uploadFile = (req, res) => {
	const outputFilePath = join(__dirname, "../../../files", req.headers["file-path"])

	const writeStream = createWriteStream(outputFilePath)

	req
		.on("end", () => res.end())
		.pipe(writeStream)
		.on("error", (e) => {
			res.statusCode = 500
			res.write(e.message)
			res.end()
		})
}

module.exports = {
	uploadFile,
}
