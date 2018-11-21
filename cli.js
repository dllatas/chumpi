const teseo = require('./index')
const io = require('./io');

async function cli(input) {
  const options = io.capture(input)
  await teseo(options)
}

cli(process.argv)
