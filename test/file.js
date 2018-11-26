const fs = require('fs');
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

  it('writes a file into default dest', async () => {
    const actual = { test: true };
    const filename = await file.write(JSON.stringify(actual), 'json');
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
  });

  it('content for write is an array', async () => {
    const actual = { test: true };
    const filename = await file.write([JSON.stringify(actual)], 'json');
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
  });

  it('dest folder is not the default', async () => {
    const actual = { test: true };
    const dest = 'no-default-dest';
    // Create the dest folder
    const dirname = file.makeDirname(dest);
    fs.mkdirSync(dirname);
    const filename = await file.write(JSON.stringify(actual), 'json', { dest });
    const buffer = await file.readFilePromise(filename);
    const expected = JSON.parse(buffer);
    assert.deepEqual(actual, expected);
    // Remove the dest folder
    fs.unlinkSync(filename);
    fs.rmdirSync(dirname);
  });
});
