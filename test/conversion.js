const { describe, it } = require('mocha');
const { assert } = require('chai');
const conversion = require('../src/conversion');

describe('conversion module test suite', () => {
  it('load throws when action is not supported', () => {
    const loaded = () => { conversion.load('scream', 'yml'); };
    assert.throws(loaded);
  });

  it('load throws when format is not supported', () => {
    const loaded = () => { conversion.load('parse', 'xml'); };
    assert.throws(loaded);
  });

  it('load must return a function', () => {
    const loaded = conversion.load('parse', 'yaml');
    assert.isFunction(loaded);
  });

  it('executes parses the files argument into an array', async () => {
    const input = '- master: brian eno';
    const expected = { master: 'brian eno' };
    const actual = await conversion.execute('parse', 'yaml', input);
    assert.deepEqual(actual[0][0], expected);
  });
});
