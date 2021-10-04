const { createReadStream, createWriteStream, stat } = require("fs");
const { createGzip } = require("zlib");
const { createSendFileStream } = require("./src/send-file");
const { createProgressStream } = require("./src/progress-bar");

const [SOURSE_FILE_PATH, OUTPUT_FILE_PATH] = process.argv.slice(2);

stat(SOURSE_FILE_PATH, (e, { size }) => {
  if (e !== null) {
    console.log(e.message);
    process.exit(1);
  }

  const readStream = createReadStream(SOURSE_FILE_PATH);
  const gzipStream = createGzip();
  const progressStream = createProgressStream(size);
  const writeStream = process.argv.includes("--remote")
    ? createSendFileStream(OUTPUT_FILE_PATH)
    : createWriteStream(OUTPUT_FILE_PATH);

  readStream.pipe(progressStream).pipe(gzipStream).pipe(writeStream);
});
