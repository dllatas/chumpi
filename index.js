const file = require('./src/file');
const conversion = require('./src/conversion');
const sort = require('./src/sort');

async function teseo(options) {
  const files = await file.read(options.dir);
  const tables = await conversion.execute('parse', options.format, files);
  const sorted = sort.execute(tables);
  const dumped = await conversion.execute('dump', options.format, sorted);
  await file.write(dumped);
  return sorted;
}

module.exports = teseo;
