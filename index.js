const io = require('./io');
const read = require('./read');
const parser = require('./parser');
const sort = require('./sort');

async function teseo(options) {
  const files = await read.files(options.dir)
  console.log(files)
  const tables = await parser.execute(options.format, files);
  console.log(tables)
  const sorted = sort.execute(tables)
  console.log(sorted)
}

module.exports = teseo
