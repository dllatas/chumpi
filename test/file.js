const path = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');
const file = require('../src/file');

describe('file module test suite', () => {
  const dir = path.resolve(__dirname, '01');

  it('list the filenames of a directory', async () => {
    const actual = await file.list(dir);
    const expected = ['detail', 'master'].map(f => `${path.resolve(__dirname, '01')}/${f}.yaml`);
    assert.sameMembers(actual, expected);
  });

  it('read all filenames in a directory', async () => {
    const actual = await file.read(dir);
    const expected = 2;
    assert.strictEqual(actual.length, expected);
  });

  // it('what happens when a dir does not exist ?? ', async () => {
  //  const actual = await file.read(dir);
  // });

  it('writes a file into a default dest', async () => {
    const actual = { test: true };
    const { filename } = await file.write(JSON.stringify(actual), { format: 'json' });
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
    await file.removeFilePromise(filename);
  });

  it('content for write is an array', async () => {
    const actual = { test: true };
    const { filename } = await file.write([JSON.stringify(actual)], 'json');
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
    await file.removeFilePromise(filename);
  });

  it('dest folder is not the default', async () => {
    const actual = { test: true };
    const dest = 'no-default-dest';
    const { dirname, filename } = await file.write(JSON.stringify(actual), { format: 'json', dest });
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
    await file.removeFilePromise(filename);
    await file.removeDirPromise(dirname);
  });

  it('create two foler should not throw an error', async () => {
    const dest = 'eexist-dest';
    const dirname = await file.createDir(dest);
    const dirnameError = await file.createDir(dest);
    assert.strictEqual(dirname, dirnameError);
    await file.removeDirPromise(dirname);
  });

  it('create folder with ilegal name throws an error', async () => {
    try {
      await file.createDir('no-default-dest/test/breaks', { recursive: false });
    } catch (e) {
      assert.exists(e);
    }
  });
});
