const path = require('path')
const teseo = require('../index')

async function test() {

  const dirList = [
    '01',
    '02',
    '03',
    '04',
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
