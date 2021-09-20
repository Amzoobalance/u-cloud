// TODO: a tool for copying files
const { readFileSync, writeFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const sourseFilePath = './my.html';
const outPuthFilePath = './выхлоп.html';

const content = readFileSync(sourseFilePath, { encoding: 'utf-8' });

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,

)

writeFileSync(outPuthFilePath, content);

console.log(
    `Copied ${getFileSize(sourseFilePath)}KB from ${sourseFilePath} to ${outPuthFilePath}`
);
