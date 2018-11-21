const fs = require('fs');
const path = require('path');
const util = require('util');
const readDirPromise = util.promisify(fs.readdir)
const readFilePromise = util.promisify(fs.readFile)

// Read filenames from the dir option
const list = async function(dir) {
  let files = await readDirPromise(dir);
  files = files.map(f => path.join(dir, f));
  return files
}

// Read files
exports.files = async function(dir) {
  const files = await list(dir)
  return await Promise.all(files.map(f => readFilePromise(f)));
}
