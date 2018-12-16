const { describe, it } = require('mocha');
const path = require('path');
const { assert } = require('chai');
const { teseo } = require('../src');

describe('teseo basic cases suite', () => {
  const yaml = 'yaml';

  it('Parent with one child', async () => {
    const expected = ['master', 'detail'];
    const dir = path.resolve(__dirname, '01');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });

  it('Parent with more than one child', async () => {
    const expected = ['master', 'detail', 'detail2'];
    const dir = path.resolve(__dirname, '02');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });

  it('Master with one child and grandchild', async () => {
    const expected = ['master', 'detail', 'detail2'];
    const dir = path.resolve(__dirname, '03');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = ['master', 'detail', 'detail2', 'detail3', 'detail4'];
    const dir = path.resolve(__dirname, '04');
    const actual = await teseo({ dir, format: yaml });
    assert.deepEqual(actual.order, expected);
  });
});
