const fs = require('fs');
const path = require('path');
const util = require('util');

const readDirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const mkDirPromise = util.promisify(fs.mkdir);

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
  const filename = `${dest}/${timestamp}.${format}`;
  return filename;
};

const createDir = async (dirname) => {
  const dirCreated = await mkDirPromise(dirname, { recursive: true });
  if (!dirCreated) {
    return;
  }
  if (dirCreated.code === 'EEXIST') {
    return;
  }
  throw dirCreated;
};

const makeDirname = (dest) => {
  if (path.isAbsolute(dest)) {
    return dest;
  }
  const dirname = `${path.dirname(__dirname)}/${dest}`;
  return dirname;
};
// Write into file
const write = async function write(content, options) {
  const { format, dest = 'output' } = options;
  if (Array.isArray(content)) {
    content = content[0];
  }
  const dirname = makeDirname(dest);
  await createDir(dirname);
  const filename = makeFilename(dirname, format);
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
