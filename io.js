// Capture input from shell
exports.capture = (input, elementsToIgnore = 2) => {

  const options = {
    dir: '',
    format: ''
  }

  for (i = elementsToIgnore; i < input.length; i++) {

    const option = input[i].split('=')
    if (option.length < elementsToIgnore) {
      continue
    }

    if (Object.keys(options).includes(option[0])) {
      options[option[0]] = option[1]
    }

  }

  return options
}
