const yaml = require('js-yaml');

const parse = {
  yaml: yaml.load,
  yml: yaml.load,
  json: JSON.parse,
};

const dump = {
  yaml: yaml.safeDump,
  yml: yaml.safeDump,
  json: JSON.stringify,
};

const proxy = {
  parse,
  dump,
};

// Parse files into user format via proxy
const load = (action, format) => {
  if (!proxy[action]) {
    throw new Error(`${action} is not supported ... yet!`);
  }

  if (!proxy[action][format]) {
    throw new Error(`${format} is not supported ... yet!`);
  }

  return proxy[action][format];
};

const execute = async function execute(action, format, files) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  const parser = load(action, format);
  return Promise.all(files.map(f => parser(f)));
};

module.exports = {
  load,
  execute,
};
