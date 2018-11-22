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

// Read files
exports.files = async function files(dir) {
  const filenames = await list(dir);
  return Promise.all(filenames.map(f => readFilePromise(f)));
};

// Write into files
exports.write = async function write(dest, content) {
  if (Array.isArray(content)) {
    content = content[0];
  }
  await writeFilePromise(`${__dirname}/${dest}${Date.now().toString()}`, content);
};
