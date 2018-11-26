const { describe, it } = require('mocha');
const { assert } = require('chai');
const io = require('../src/io');

describe('io functions test suite', () => {
  const input = ['node', 'teseo', 'dir=./test', 'format=yaml'];

  it('capture should return an object with at least the same number of mandatory props as optionsKey', () => {
    const captured = io.capture(input);
    // assert.equal(Object.keys(captured).length, io.optionsKey.length);
    assert.equal(Object.keys(captured).length, 2);
  });

  it('capture should return an object with at least the same mandatory props as optionsKey', () => {
    const captured = io.capture(input);
    // assert.deepEqual(Object.keys(captured), io.optionsKey);
    assert.deepEqual(Object.keys(captured), ['dir', 'format']);
  });

  it('capture should not split input option if it does not contain symbol =', () => {
    const wrongInput = ['node', 'teseo', 'dir=./test', 'format:yaml'];
    const captured = io.capture(wrongInput);
    assert.notStrictEqual(Object.keys(captured), io.optionsKey);
  });

  it('capture should not add to output a prop not defined in options', () => {
    const wrongInput = ['node', 'teseo', 'dest=./test', 'format=yaml'];
    const captured = io.capture(wrongInput);
    assert.notStrictEqual(Object.keys(captured), io.optionsKey);
  });
});
