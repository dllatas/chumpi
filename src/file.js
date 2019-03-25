const fs = require('fs');
const path = require('path');
const util = require('util');

const readDirPromise = util.promisify(fs.readdir);
const mkDirPromise = util.promisify(fs.mkdir);
const removeDirPromise = util.promisify(fs.rmdir);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const removeFilePromise = util.promisify(fs.unlink);

const DEFAULT_DEST = '/tmp/chumpi';
// Read filenames from the dir option
const list = async (dir) => {
  let files = await readDirPromise(dir);
  files = files.map(f => path.join(dir, f));
  return files;
};

// Read file
const read = async (dir) => {
  const filenames = await list(dir);
  return Promise.all(filenames.map(f => readFilePromise(f)));
};

const makeFilename = (dest, format) => {
  const timestamp = Date.now().toString();
  const filename = `${dest}/${timestamp}.${format}`;
  return filename;
};

const makeDirname = (dest, options = {}) => {
  const { absolute = false } = options;
  if (absolute && path.isAbsolute(dest)) {
    return dest;
  }
  if (DEFAULT_DEST === dest) {
    return DEFAULT_DEST;
  }
  const dirname = path.join(DEFAULT_DEST, dest);
  return dirname;
};

const createDir = async (dest, options = {}) => {
  const { recursive = true } = options;
  const dirname = makeDirname(dest);
  await mkDirPromise(dirname, { recursive });
  return dirname;
};

// Write into file
const write = async function write(content, options) {
  const { format, dest = DEFAULT_DEST } = options;
  if (Array.isArray(content)) {
    content = content[0];
  }
  const dirname = await createDir(dest);
  const filename = makeFilename(dirname, format);
  await writeFilePromise(filename, content);
  return { dirname, filename };
};

module.exports = {
  list,
  read,
  write,
  readFilePromise,
  makeFilename,
  makeDirname,
  createDir,
  removeFilePromise,
  removeDirPromise,
};
