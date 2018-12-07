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

const message = {
  'help-direct': `usage: teseo [-d path] [-f value] [-n value] [-m value] [-w path]
where:
  -d: path to files (mandatory).
  -f: file format (mandatory)
  -n: table name label (optional, default: name)
  -m: table dependencies label (optional, default: master)
  -w: output path (optional, default /tmp/teseo)

usage: teseo [--dir path] [--file value] [--name value] [--master value] [--write path]
where:
  --dir: path to files (mandatory).
  --format: file format (mandatory)
  --name: table name label (optional, default: name)
  --master: table dependencies label (optional, default: master)
  --write: output path (optional, default /tmp/teseo)

usage: teseo path format
where:
  path: path to files
  format: file format

display help menu
  teseo [-h] [--help]`,
  help: 'Invalid argument(s). Run teseo [-h] [--help] for help!',
};

const display = (word) => {
  console.info(message[word]);
  process.exit(0);
};

const specialCases = {
  2: 'help-direct',
  3: 'help',
  4: 'simple',
};

const translateSpecialCase = (word, length, input) => {
  const translation = {
    'help-direct': (_word) => {
      display(_word);
    },
    help: (_word, _length, _input) => {
      if (['-h', '--help'].includes(_input[_length - 1])) {
        display('help-direct');
      } else {
        display(_word);
      }
    },
    simple: (_word, _length, _input) => ({
      dir: _input[_length - 2],
      format: _input[_length - 1],
    }),
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

  // Check if length%2 === 1 ... input is wrong
  if (length % 2 === 1) {
    display('help');
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
    display('help');
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
