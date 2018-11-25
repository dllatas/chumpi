const options = {
    dir: '',
    format: '',
};

const optionsKey = Object.keys(options);

// Capture input from shell
const capture = (input) => {

  const captured = {}
  const elementsToIgnore = 2
  const elementsInOption = 2

  for (let i = elementsToIgnore; i < input.length; i += 1) {
    const option = input[i].split('=');
    if (option.length !== elementsInOption) {
      continue;
    }

    if (optionsKey.includes(option[0])) {
      captured[option[0]] = option[1];
    }
  }

  return captured;
};

module.exports = {
  capture,
  options,
  optionsKey
}
