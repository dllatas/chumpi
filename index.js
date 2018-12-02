const validation = require('./src/validation');
const file = require('./src/file');
const conversion = require('./src/conversion');
const sort = require('./src/sort');
const io = require('./src/io');

async function teseo(options) {
  validation.enforce(options, io.schema);
  const files = await file.read(options.dir);
  const tables = await conversion.execute('parse', options.format, files);
  const sorted = sort.execute(tables, options.master, options.name);
  return sorted;
}

module.exports = teseo;
