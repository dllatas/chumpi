const { describe, it } = require('mocha');
const { assert } = require('chai');
const sort = require('../src/sort');

describe('sort module test suite', () => {
  it('isParentIncluded returns false', () => {
    const sorted = ['master', 'detail'];
    const master = ['neo'];
    const actual = sort.isParentIncluded(sorted, master);
    assert.isFalse(actual);
  });

  it('sort discards a child without master in sort', () => {
    const tables = [{ name: 'master' }, { name: 'neo', master: ['detail'] }, { name: 'detail', master: ['master'] }];
    const expected = { order: ['master', 'detail', 'neo'] };
    const actual = sort.execute(tables);
    assert.deepEqual(actual, expected);
  });

  it('sort returns sorted when there are no unsorted tables', () => {
    const tables = [{ name: 'master' }, { name: 'neo' }, { name: 'detail' }];
    const expected = { order: ['master', 'detail', 'neo'] };
    const actual = sort.execute(tables);
    assert.sameMembers(actual.order, expected.order);
  });
});
