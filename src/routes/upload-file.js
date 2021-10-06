const { createWriteStream } = require("fs");

const uploadFile = (req, res) => {
  const outputFilePath = req.headers["file-path"];
  const writeStream = createWriteStream(outputFilePath);

  req
    .on("end", () => res.end())
    .pipe(writeStream)
    .on("error", (e) => {
      res.statusCode = 500;
      res.write(e.message);
      res.end();
    });
};

module.exports = {
  uploadFile,
};
