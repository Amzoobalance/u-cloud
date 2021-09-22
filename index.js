// TODO: a tool for copying files
const { copyFile, stat } = require("fs");
const { prop } = require("ramda");
const { pipe, divideBy, callbackErrorHandler } = require("./src/utils");

const [sourseFilePath, outPuthFilePath] = process.argv.slice(2);

copyFile(sourseFilePath, outPuthFilePath, callbackErrorHandler);

if (!process.argv.includes("--verbose")) {
  process.exit(0);
}

stat(sourseFilePath, (error, stat) => {
  callbackErrorHandler(error);

  const getFileSize = pipe(prop("size"), divideBy(1024), Math.round);

  console.log(
    `Copied ${getFileSize(stat)}KB from ${sourseFilePath} to ${outPuthFilePath}`
  );
});
