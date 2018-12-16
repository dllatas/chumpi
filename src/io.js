const message = require('./message');

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
  write: {
    mandatory: false,
    type: 'string',
  },
};

const eq = {
  d: 'dir',
  f: 'format',
  m: 'master',
  n: 'name',
  w: 'write',
};

const display = word => ({
  console: true,
  message: message[word],
});

const specialCases = {
  2: 'help',
  3: 'warning',
  4: 'simple',
};

const translateSpecialCase = (word, length, input) => {
  const translation = {
    help: _word => display(_word),
    warning: (_word, _length, _input) => {
      if (['-h', '--help'].includes(_input[_length - 1])) {
        return display('help');
      }
      return display(_word);
    },
    simple: (_word, _length, _input) => {
      console.log(input);
      return {
        dir: _input[_length - 2],
        format: _input[_length - 1],
      };
    },
  };
  return translation[word](word, length, input);
};

// Capture input from shell
const capture = (input) => {
  const { length } = input;
  const captured = {};
  const elementsToIgnore = 2;

  if (specialCases[length]) {
    return translateSpecialCase(specialCases[length], length, input);
  }

  if (length % 2 === 1) {
    return display('warning');
  }

  // Inspect first argument to choose proper schema
  const firstChar = input[elementsToIgnore][0];
  const secondChar = input[elementsToIgnore][1];
  const singleChar = '-';
  let specialChar = '';

  if (firstChar === singleChar) {
    specialChar = '-';
  }

  if (secondChar === singleChar) {
    specialChar = '--';
  }

  if (!specialChar) {
    return display('help');
  }

  for (let i = elementsToIgnore; i < length; i += 2) {
    const option = input[i].split(specialChar)[1];
    const value = input[i + 1];
    const qs = specialChar === singleChar ? eq[option] : option;

    if (Object.keys(schema).includes(qs)) {
      captured[qs] = value;
    }
  }

  return captured;
};

module.exports = {
  capture,
  schema,
  message,
};
/*
  for (let i = elementsToIgnore; i < input.length; i += 1) {
    const option = input[i].split('=');
    if (option.length !== elementsInOption) {
      continue;
    }

    if (Object.keys(schema).includes(option[0])) {
      captured[option[0]] = option[1];
    }
  }
  */
