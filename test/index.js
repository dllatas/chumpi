const path = require('path')
const assert = require('assert').strict
const teseo = require('../index')

const expected = [
  ['master', 'detail'],
  ['master', 'detail', 'detail2'],
  ['master', 'detail', 'detail2'],
  ['master', 'detail', 'detail2', 'detail3', 'detail4'],
]

async function test() {

  const dirList = [
    '01',
    '02',
    '03',
    '04',
  ]
  
  const real = await Promise.all(  
    dirList
      .map(d => path.resolve(__dirname, d))
      .map(
        d => teseo({ dir: d, format: 'yaml' })
      )
  )

  // Compare results
  for (let i = 0; i < real.length; i++) {
    assert.deepStrictEqual(expected[i], real[i].order);
  }
}

test()
