const { describe, it } = require('mocha');
const { assert } = require('chai');
const validation = require('../src/validation');

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

describe('validation module test suite', () => {
  it('enforce throws when mandatory option is not defined. ie format', () => {
    const options = {
      dir: '/tmp/schema',
    };
    const enforced = () => { validation.enforce(options, schema); };
    assert.throws(enforced);
  });

  it('enforce throws when mandatory is defined without a value. ie format', () => {
    const options = {
      dir: '/tmp/schema',
      format: '',
    };
    const enforced = () => { validation.enforce(options, schema); };
    assert.throws(enforced);
  });

  it('enforce throws when an option has a different type', () => {
    const options = {
      dir: '/tmp/schema',
      format: 'json',
      master: 5,
    };
    const enforced = () => { validation.enforce(options, schema); };
    assert.throws(enforced);
  });

  it('isLegit throws when a schema is not defined', () => {
    const options = {
      dir: '/tmp/schema',
      format: 'json',
      master: 5,
    };
    const legit = () => validation.isLegit(options);
    assert.throws(legit);
  });
});
