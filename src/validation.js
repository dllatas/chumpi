const check = (option, rules, value, errors) => {
  let type = typeof value;
  if (Array.isArray(value)) {
    type = 'array';
  }
  if (rules.mandatory && !value) {
    errors.push(`Option ${option} is mandatory but does not have a value.\n`);
  }
  if (value && rules.type !== type) {
    errors.push(`Option ${option} should be type ${rules.type} but it is type: ${type}.\n`);
  }
};

const isLegit = (input, schema) => {
  if (!schema) {
    throw new Error('Schema was not defined for validation');
  }
  const schemaKey = Object.keys(schema);
  const mandatoryKey = schemaKey.filter(o => schema[o].mandatory);
  const errors = [];

  for (const m of mandatoryKey) {
    if (!input[m]) {
      errors.push(`Option ${m} is mandatory.\n`);
    }
  }

  for (const o of schemaKey) {
    check(o, schema[o], input[o], errors);
  }

  if (errors.length > 0) {
    return { ok: false, error: errors };
  }
  return { ok: true };
};

const enforce = (input, schema) => {
  const legit = [];
  if (!Array.isArray(input)) {
    input = [input];
  }
  const { length } = input;
  for (let i = 0; i < length; i += 1) {
    legit.push(isLegit(input[i], schema));
  }
  if (legit.map(l => l.ok).every(x => x === true)) {
    return true;
  }
  const errorMsg = legit.map(l => l.error.reduce((a, b) => a + b));
  throw new Error(errorMsg.reduce((a, b) => a + b));
};


module.exports = {
  enforce,
  isLegit,
};
