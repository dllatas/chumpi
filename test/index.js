const path = require('path')
const teseo = require('../index')

async function test() {

  const dirList = [
    'data-01',
    'data-02',
    'data-03',
    'data-04',
  ]
  
  const result = await Promise.all(  
    dirList
      .map(d => path.resolve(__dirname, d))
      .map(
        d => teseo({ dir: d, format: 'yaml' })
      )
  )

  console.log(result)
}

test()
