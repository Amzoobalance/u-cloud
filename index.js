// TODO: a tool for copying files
const { copyFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const sourseFilePath = './my.html';
const outPuthFilePath = './выхлоп.html';

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,

)

copyFileSync(sourseFilePath, outPuthFilePath);

console.log(
    `Copied ${getFileSize(sourseFilePath)}KB from ${sourseFilePath} to ${outPuthFilePath}`
);
