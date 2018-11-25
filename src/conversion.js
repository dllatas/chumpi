const yaml = require('js-yaml');

const parse = {
  yaml: yaml.load,
  yml: yaml.load,
};

const dump = {
  yaml: yaml.safeDump,
  yml: yaml.safeDump,
};

const proxy = {
  parse,
  dump,
};

// Parse files into user format via proxy
const load = (action, format) => {
  if (!proxy[action]) {
    console.log(`${action} is not supported ... yet!`);
    process.exit(0);
  }

  if (!proxy[action][format]) {
    console.log(`${format} is not supported ... yet!`);
    process.exit(0);
  }

  return proxy[action][format];
};

exports.execute = async function execute(action, format, files) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  const parser = load(action, format);
  return Promise.all(files.map(f => parser(f)));
};
