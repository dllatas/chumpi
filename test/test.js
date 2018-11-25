const { describe, it } = require('mocha');
const path = require('path');
const { assert } = require('chai');
const teseo = require('../index');

describe('Teseo returns the proper result for some basic cases in YAML format', () => {
  const yaml = 'yaml';

  it('Master with one detail', async () => {
    const expected = ['master', 'detail'];
    const dir = path.resolve(__dirname, '01');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });

  it('Master with more than one detail', async () => {
    const expected = ['master', 'detail', 'detail2'];
    const dir = path.resolve(__dirname, '02');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });
});
