const teseo = require('./teseo');
const io = require('./io');
const conversion = require('./conversion');
const file = require('./file');

async function cli(input) {
  const options = io.capture(input);
  if (options.console) {
    return options;
  }
  const result = await teseo(options);
  const dumped = await conversion.execute('dump', options.format, result);
  const { filename } = await file.write(dumped, options);
  return filename;
}

module.exports = cli;
