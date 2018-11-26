const fs = require('fs');
const path = require('path');
const util = require('util');

const readDirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

// Read filenames from the dir option
const list = async function list(dir) {
  let files = await readDirPromise(dir);
  files = files.map(f => path.join(dir, f));
  return files;
};

// Read file
const read = async function read(dir) {
  const filenames = await list(dir);
  return Promise.all(filenames.map(f => readFilePromise(f)));
};

const makeFilename = (dest, format) => {
  const timestamp = Date.now().toString();
  const filename = `${path.dirname(__dirname)}/${dest}/${timestamp}.${format}`;
  return filename;
};

const makeDirname = (dest) => {
  const dirname = `${path.dirname(__dirname)}/${dest}`;
  return dirname;
};
// Write into file
const write = async function write(content, format, options = {}) {
  const { dest = 'output' } = options;
  if (Array.isArray(content)) {
    content = content[0];
  }
  const filename = makeFilename(dest, format);
  await writeFilePromise(filename, content);
  return filename;
};

module.exports = {
  list,
  read,
  write,
  readFilePromise,
  makeFilename,
  makeDirname,
};
