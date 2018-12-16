const path = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');
const io = require('../src/io');

describe('io functions test suite', () => {
  it('capture should return an object with at least the same number of mandatory props as optionsKey', () => {
    const input = ['node', 'teseo', '--dir', './test', '--format', 'yaml'];
    const captured = io.capture(input);
    const expected = Object.keys(io.schema).filter(s => io.schema[s].mandatory).length;
    assert.strictEqual(Object.keys(captured).length, expected);
  });

  it('capture should return an object with at least the same mandatory props as optionsKey', () => {
    const input = ['node', 'teseo', '--dir', './test', '--format', 'yaml'];
    const captured = io.capture(input);
    const expected = Object.keys(io.schema).filter(s => io.schema[s].mandatory);
    assert.deepEqual(Object.keys(captured), expected);
  });

  /* it('capture should return an object even if input has different flags combined', () => {
    const input = ['node', 'teseo', '--dir', './test', '-f', 'yaml'];
    const actual = io.capture(input);
    const expected = {
      dir: './test',
      format: 'yaml',
    };
    assert.deepEqual(actual, expected);
  }); */

  it('capture should not add to output a prop not defined in options', () => {
    const wrongInput = ['node', 'teseo', '--godzilla', './test', '--format', 'yaml'];
    const captured = io.capture(wrongInput);
    const expected = { format: 'yaml' };
    assert.notStrictEqual(captured, expected);
  });

  it('show help when there are no arguments', () => {
    const input = ['node', 'teseo'];
    const captured = io.capture(input);
    console.log(captured);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message.help);
  });

  it('show help with flag -h as argument', () => {
    const input = ['node', 'teseo', '-h'];
    const captured = io.capture(input);
    console.log(captured);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message['help-direct']);
  });

  it('show help with flag --help as argument', () => {
    const input = ['node', 'teseo', '--help'];
    const captured = io.capture(input);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message['help-direct']);
  });

  it('show warning when arguments are wrong', () => {
    const input = ['node', 'teseo', '-å'];
    const captured = io.capture(input);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message.help);
  });

  it('show warning when arguments are incomplete', () => {
    const input = ['node', 'teseo', '-d', '/tmp/teseo', '-f', 'yaml', '-n'];
    const captured = io.capture(input);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message.help);
  });

  it('show warning when arguments are bad formatted', () => {
    const input = ['node', 'teseo', 'd', '/tmp/teseo', '-f', 'yaml'];
    const captured = io.capture(input);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, io.message.help);
  });

  it('execute teseo with simple version', () => {
    const dir = path.resolve(__dirname, '02');
    const input = ['node', 'teseo', `${dir}`, 'yaml'];
    const actual = io.capture(input);
    const expected = {
      dir,
      format: 'yaml',
    };
    assert.deepEqual(expected, actual);
  });
});
