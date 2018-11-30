const options = {
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

const optionsKey = Object.keys(options);

const mandatoryKey = Object.keys(options).filter(o => options[o].mandatory);

const check = (option, rules, value, errors) => {
  const type = typeof value;
  if (rules.mandatory && !value) {
    errors.push(`Option ${option} is mandatory but does not have a value.\n`);
  }
  if (value && rules.type !== type) {
    errors.push(`Option ${option} should be type ${rules.type} but it is type: ${type}.\n`);
  }
};

const isLegit = (input) => {
  const errors = [];

  // Check that mandatory keys are present
  for (const m of mandatoryKey) {
    if (!input[m]) {
      errors.push(`Option ${m} is mandatory.\n`);
    }
  }

  for (const o of optionsKey) {
    check(o, options[o], input[o], errors);
  }

  if (errors.length > 0) {
    return { ok: false, error: errors };
  }
  return { ok: true };
};

const enforce = (input) => {
  const legit = isLegit(input);
  if (legit.ok) {
    return true;
  }
  throw new Error(legit.error.reduce((a, b) => a + b));
};


module.exports = {
  options,
  optionsKey,
  enforce,
};
