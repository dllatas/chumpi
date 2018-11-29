const { describe, it } = require('mocha');
const { assert } = require('chai');
const validation = require('../src/validation');

describe('validation module test suite', () => {
  it('enforce throws when mandatory option is not defined. ie format', () => {
    const options = {
      dir: '/tmp/schema',
    };
    const enforced = () => { validation.enforce(options); };
    assert.throws(enforced);
  });

  it('enforce throws when mandatory is defined without a value. ie format', () => {
    const options = {
      dir: '/tmp/schema',
      format: '',
    };
    const enforced = () => { validation.enforce(options); };
    assert.throws(enforced);
  });

  it('enforce throws when an option has a different type', () => {
    const options = {
      dir: '/tmp/schema',
      format: 'json',
      master: 5,
    };
    const enforced = () => { validation.enforce(options); };
    assert.throws(enforced);
  });
});
