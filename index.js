const io = require('./io');
const read = require('./read');
const parser = require('./parser');
const sort = require('./sort');

async function teseo(options) {
  const files = await read.files(options.dir)
  const tables = await parser.execute('parse', options.format, files);
  const sorted = sort.execute(tables)
  console.log(sorted)
  return sorted
}

module.exports = teseo
