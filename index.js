const file = require('./src/file');
const conversion = require('./src/conversion');
const sort = require('./src/sort');

async function teseo(options) {
  // TODO: validate that options have all the props needed in the right type
  const files = await file.read(options.dir);
  const tables = await conversion.execute('parse', options.format, files);
  // TODO: validate that props name always exist
  const sorted = sort.execute(tables, options.master, options.name);
  return sorted;
}

module.exports = teseo;
