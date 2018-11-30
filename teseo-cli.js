const teseo = require('./index');
const io = require('./src/io');
const conversion = require('./src/conversion');
const file = require('./src/file');

async function teseoCli(input) {
  const options = io.capture(input);
  const result = await teseo(options);
  const dumped = await conversion.execute('dump', options.format, result);
  await file.write(dumped, options);
}

teseoCli(process.argv);
