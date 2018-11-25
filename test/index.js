const path = require('path');
const assert = require('assert').strict;
const teseo = require('../index');

const expected = [
  ['master', 'detail', 'detail2'],
  ['master', 'detail', 'detail2', 'detail3', 'detail4'],
];

async function test(format) {
  const dirList = [
    '03',
    '04',
  ];

  const real = await Promise.all(
    dirList
      .map(d => path.resolve(__dirname, d))
      .map(
        d => teseo({
          dir: d,
          format,
        }),
      ),
  );

  return real;
}

test('yaml')
  .then((real) => {
    for (let i = 0; i < real.length; i += 1) {
      assert.deepStrictEqual(expected[i], real[i].order);
    }
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
