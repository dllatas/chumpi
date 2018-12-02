const schema = {
  dir: {
    mandatory: true,
    type: 'string',
  },
  format: {
    mandatory: true,
    type: 'string',
  },
  master: {
    mandatory: false,
    type: 'string',
  },
  name: {
    mandatory: false,
    type: 'string',
  },
  dest: {
    mandatory: false,
    type: 'string',
  },
};


// Capture input from shell
const capture = (input) => {
  const captured = {};
  const elementsToIgnore = 2;
  const elementsInOption = 2;

  for (let i = elementsToIgnore; i < input.length; i += 1) {
    const option = input[i].split('=');
    if (option.length !== elementsInOption) {
      continue;
    }

    if (Object.keys(schema).includes(option[0])) {
      captured[option[0]] = option[1];
    }
  }

  return captured;
};

module.exports = {
  capture,
  schema,
};
