const { describe, it } = require('mocha');
const { assert } = require('chai');
const sort = require('../src/sort');

describe('sort module test suite', () => {
  it('isParentIncluded returns false', () => {
    const sorted = ['master', 'detail'];
    const parent = ['neo'];
    const actual = sort.isParentIncluded(sorted, parent);
    assert.isFalse(actual);
  });

  it('sort discards a child without parent in sort', () => {
    const tables = [{ name: 'master' }, { name: 'neo', parent: ['detail'] }, { name: 'detail', parent: ['master'] }];
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
