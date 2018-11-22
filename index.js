const read = require('./read');
const parser = require('./parser');
const sort = require('./sort');

async function teseo(options) {
  const files = await read.files(options.dir);
  const tables = await parser.execute('parse', options.format, files);
  const sorted = sort.execute(tables);
  const dumped = await parser.execute('dump', options.format, sorted);
  await read.write(dumped);
  return sorted;
}

module.exports = teseo;
