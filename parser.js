const yaml = require('js-yaml');

const parse = { 
  "yaml": yaml.load,
  "yml": yaml.load,
}

const dump = { 
  "yaml": yaml.safeDump,
  "yml": yaml.safeDump,
}

const proxy = action => { 
  { 
    "parse": parseProxy,
    "dump": dumpProxy
  }

}

// Parse files into user format via proxy
const load = (action, format) => {

  if (!proxy[format]) {
    console.log(format + ' is not supported ... yet!');
    process.exit(0);
  }

  return proxy[format];

}

exports.execute = async function(format, files) {
  const parser = load(format);
  return await Promise.all(files.map(f => parser(f)));
}
