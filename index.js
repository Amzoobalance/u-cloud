// TODO: a tool for copying files
const { copyFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const [sourseFilePath, outPuthFilePath] = process.argv.slice(2);

copyFileSync(sourseFilePath, outPuthFilePath);

if (!process.argv.includes('--verbose')) {
    process.exit(0);
}

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,

);

console.log(
    `Copied ${getFileSize(sourseFilePath)}KB from ${sourseFilePath} to ${outPuthFilePath}`
);
