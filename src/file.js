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
exports.read = async function files(dir) {
  const filenames = await list(dir);
  return Promise.all(filenames.map(f => readFilePromise(f)));
};

// Write into file
exports.write = async function write(content, dest = 'output') {
  if (Array.isArray(content)) {
    content = content[0];
  }
  const timestamp = Date.now().toString();
  console.log(`Open file at: ${path.dirname(__dirname)}/${dest}/${timestamp}`);
  await writeFilePromise(`${path.dirname(__dirname)}/${dest}/${timestamp}`, content);
};
