const { describe, it } = require('mocha');
const { assert } = require('chai');
const io = require('../src/io');

describe('io functions test suite', () => {

  const input = ['node', 'teseo', 'dir=./test', 'format=yaml']

  it('capture should return an object with the same number of props as optionsKey', () => {
    const captured = io.capture(input)
    assert.equal(Object.keys(captured).length, io.optionsKey.length)
  });


})

