const { describe, it } = require('mocha');
const { assert } = require('chai');
const io = require('../src/io');
const message = require('./message');

const schema = {
  dir: {
    mandatory: true,
    type: 'string',
    cli: ['-d', '--dir'],
  },
  format: {
    mandatory: true,
    type: 'string',
    cli: ['-f', '--format'],
  },
  master: {
    mandatory: false,
    type: 'string',
    cli: ['-m', '--master'],
  },
  name: {
    mandatory: false,
    type: 'string',
    cli: ['-n', '--name'],
  },
  output: {
    mandatory: false,
    type: 'string',
    cli: ['-o', '--output'],
  },
};

const cliOptions = {
  '-d': 'dir',
  '--dir': 'dir',
  '-f': 'format',
  '--format': 'format',
  '-n': 'name',
  '--name': 'name',
  '-m': 'master',
  '--master': 'master',
  '-o': 'output',
  '--output': 'output',
};

describe('io functions test suite', () => {
  it('capture should always return an object with mandatory props as defined in io.schema', () => {
    const input = ['node', 'teseo', '-d', './test', '-f', 'yaml'];
    const captured = io.capture(input, message, cliOptions);
    const expected = Object.keys(schema).filter(s => schema[s].mandatory);
    assert.deepEqual(Object.keys(captured), expected);
  });

  it('capture should return an object even if input has different flags combined', () => {
    const input = ['node', 'teseo', '--dir=./test', '-f', 'yaml'];
    const actual = io.capture(input, message, cliOptions);
    const expected = {
      dir: './test',
      format: 'yaml',
    };
    assert.deepEqual(actual, expected);
  });

  it('capture should not add to output a prop not defined in options', () => {
    const wrongInput = ['node', 'teseo', '--godzilla', './test', '--format', 'yaml'];
    const captured = io.capture(wrongInput, message, cliOptions);
    const expected = { format: 'yaml' };
    assert.notStrictEqual(captured, expected);
  });

  it('show help when there are no arguments', () => {
    const input = ['node', 'teseo'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.help);
  });

  it('show help with flag -h as argument', () => {
    const input = ['node', 'teseo', '-h'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.help);
  });

  it('show help with flag --help as argument', () => {
    const input = ['node', 'teseo', '--help'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.help);
  });

  it('show warning when arguments are wrong', () => {
    const input = ['node', 'teseo', '-å'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.warning);
  });

  it('show warning when arguments are incomplete', () => {
    const input = ['node', 'teseo', '-d', '/tmp/chumpi', '-f', 'yaml', '-n'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.warning);
  });

  it('show warning when arguments are bad formatted', () => {
    const input = ['node', 'teseo', 'd', '/tmp/chumpi', '-f', 'yaml'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.warning);
  });

  it('show warning when option is falsy', () => {
    const input = ['node', 'teseo', '-a', '/tmp/chumpi', '-f', 'yaml'];
    const captured = io.capture(input, message, cliOptions);
    assert.isTrue(captured.console);
    assert.strictEqual(captured.message, message.warning);
  });
});
