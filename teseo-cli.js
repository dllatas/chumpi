const teseo = require('./index');
const io = require('./src/io');

async function teseoCli(input) {
  const options = io.capture(input);
  await teseo(options);
}

teseoCli(process.argv);
