const { message } = require('./message');

const schema = {
  dir: {
    mandatory: true,
    type: 'string',
    cli: ['-d', '--dir'],
  },
  format: {
    mandatory: true,
    type: 'string',
    cli: ['-f', '--format'],
  },
  master: {
    mandatory: false,
    type: 'string',
    cli: ['-m', '--master'],
  },
  name: {
    mandatory: false,
    type: 'string',
    cli: ['-n', '--name'],
  },
  output: {
    mandatory: false,
    type: 'string',
    cli: ['-o', '--output'],
  },
};

const cliOptions = {
  '-d': 'dir',
  '--dir': 'dir',
  '-f': 'format',
  '--format': 'format',
  '-n': 'name',
  '--name': 'name',
  '-m': 'master',
  '--master': 'master',
  '-o': 'output',
  '--output': 'output',
};

const display = word => ({
  console: true,
  message: message[word],
});

const specialCases = {
  2: 'help',
  3: 'warning',
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
  };
  return translation[word](word, length, input);
};

const describe = input => ({
  element: input,
  simple: input.substring(0, 1) === '-' && input.substring(1, 2) !== '-' && input.length === 2,
  paired: input.indexOf('=') !== -1 && input.substring(0, 2) === '--',
});

const proxy = {
  simple: (input, element, index) => ({
    option: cliOptions[element],
    value: input[index + 1],
    jump: 2,
  }),
  paired: (input, element) => ({
    option: cliOptions[element.split('=')[0]],
    value: element.split('=')[1],
    jump: 1,
  }),
};

// Capture input from shell
const capture = (input) => {
  const { length } = input;
  const captured = {};
  const elementsToIgnore = 2;

  if (specialCases[length]) {
    return translateSpecialCase(specialCases[length], length, input);
  }

  for (let i = elementsToIgnore; i < length;) {
    const described = describe(input[i]);
    const { element, simple, paired } = described;

    if (!simple && !paired) {
      return display('warning');
    }

    const type = simple ? 'simple' : 'paired';
    const _proxy = proxy[type](input, element, i);
    const { option, value, jump } = _proxy;

    if (!option) {
      return display('warning');
    }

    if (!value) {
      return display('warning');
    }

    captured[option] = value;
    i += jump;
  }

  return captured;
};

module.exports = {
  capture,
  schema,
  message,
};
