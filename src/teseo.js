const validation = require('./validation');
const file = require('./file');
const conversion = require('./conversion');
const sort = require('./sort');
const io = require('./io');

async function teseo(options) {
  validation.enforce(options, io.schema);
  const files = await file.read(options.dir);
  const tables = await conversion.execute('parse', options.format, files);
  const sorted = sort.execute(tables, options.master, options.name);
  return sorted;
}

module.exports = teseo;
