const teseo = require('./teseo');
const io = require('./io');
const conversion = require('./conversion');
const file = require('./file');

async function cli(input) {
  const options = io.capture(input);
  const result = await teseo(options);
  const dumped = await conversion.execute('dump', options.format, result);
  const { filename } = await file.write(dumped, options);
  console.info(`Teseo killed the Minotaur! Open your file ${filename}`);
}

module.exports = cli;
