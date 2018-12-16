const { describe, it } = require('mocha');
const path = require('path');
const { assert } = require('chai');
const { cli } = require('../src');
const { readFilePromise } = require('../src/file');
const { execute } = require('../src/conversion');

describe('teseo basic cases suite', () => {
  it('Parent with one child', async () => {
    const expected = { order: ['master', 'detail'] };
    const dir = path.resolve(__dirname, '01');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected);
  });

  it('Parent with more than one child', async () => {
    const expected = { order: ['master', 'detail', 'detail2'] };
    const dir = path.resolve(__dirname, '02');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected);
  });

  it('Master with one child and grandchild', async () => {
    const expected = { order: ['master', 'detail', 'detail2'] };
    const dir = path.resolve(__dirname, '03');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = { order: ['master', 'detail', 'detail2', 'detail3', 'detail4'] };
    const dir = path.resolve(__dirname, '04');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = {
      console: true,
    };
    const dir = path.resolve(__dirname, '04');
    const input = ['node', 'teseo', '-d', dir, '-f'];
    const actual = await cli(input);
    assert.strictEqual(actual.console, expected.console);
  });
});
