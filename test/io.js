const { describe, it } = require('mocha');
const { assert } = require('chai');
const io = require('../src/io');

describe('io functions test suite', () => {
  const input = ['node', 'teseo', '--dir', './test', '--format', 'yaml'];

  it('capture should return an object with at least the same number of mandatory props as optionsKey', () => {
    const captured = io.capture(input);
    const expected = Object.keys(io.schema).filter(s => io.schema[s].mandatory).length;
    assert.strictEqual(Object.keys(captured).length, expected);
  });

  it('capture should return an object with at least the same mandatory props as optionsKey', () => {
    const captured = io.capture(input);
    const expected = Object.keys(io.schema).filter(s => io.schema[s].mandatory);
    assert.deepEqual(Object.keys(captured), expected);
  });

  it('capture should not add to output a prop not defined in options', () => {
    const wrongInput = ['node', 'teseo', '--godzilla', './test', '--format', 'yaml'];
    const captured = io.capture(wrongInput);
    const expected = { format: 'yaml' };
    assert.notStrictEqual(captured, expected);
  });
});
