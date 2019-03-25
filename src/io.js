const display = (word, message) => ({
  console: true,
  message: message[word],
});

const specialCases = {
  2: 'help',
  3: 'warning',
};

const translateSpecialCase = (word, length, input, message) => {
  const translation = {
    help: _word => display(_word, message),
    warning: (_word, _length, _input) => {
      if (['-h', '--help'].includes(_input[_length - 1])) {
        return display('help', message);
      }
      return display(_word, message);
    },
  };
  return translation[word](word, length, input);
};

const describe = input => ({
  element: input,
  simple: input.substring(0, 1) === '-' && input.substring(1, 2) !== '-' && input.length === 2,
  paired: input.indexOf('=') !== -1 && input.substring(0, 2) === '--',
});

const proxy = cliOptions => ({
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
});

// Capture input from shell
const capture = (input, message, cliOptions) => {
  const { length } = input;
  const captured = {};
  const elementsToIgnore = 2;

  if (specialCases[length]) {
    return translateSpecialCase(specialCases[length], length, input, message);
  }

  for (let i = elementsToIgnore; i < length;) {
    const described = describe(input[i]);
    const { element, simple, paired } = described;

    if (!simple && !paired) {
      return display('warning', message);
    }

    const type = simple ? 'simple' : 'paired';
    const _proxy = proxy(cliOptions)[type](input, element, i);
    const { option, value, jump } = _proxy;

    if (!option) {
      return display('warning', message);
    }

    if (!value) {
      return display('warning', message);
    }

    captured[option] = value;
    i += jump;
  }

  return captured;
};

module.exports = {
  capture,
};
