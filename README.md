# Teseo
 
Teseo reads a directory that contains a relational db schema defined in several config files. 

Each config file defines a table, therefore it has a property that has a name and another optional 
property in case the table has parent tables.

Teseo will provide the order in which the tables should be created in a db to avoid issues around
a children not having a parent.

Teseo is the spanish name for the mythical greek king Theseus. He managed to find his way in the 
Labyrinth, similar to the library finding the order of the files.

### Installation

Nodejs v10.0.0+ is needed. Teseo has not been tested against earlier versions.

1. `git clone https://github.com/dllatas/teseo.git`
2. `cd teseo`
3. `npm install`

### Usage

#### Properties
- dir: mandatory
- format: mandatory

#### CLI
```bash
node teseo dir=/home/db-schema format=yaml

```

#### API
```javascript
const teseo = require('teseo');

await teseo({
  dir: '/home/db-schema',
  format: 'yaml',
})

```
 
### Contributing
- Clone the repo
- Fetch
- `git checkout release`
- `git checkout -b ${relevant-name}/working`
- code!
- add test to the code!
- Create PR between release and working
- Fix merge conflicts, if any
- Once approved, merge stable to release

### Roadmap
- Rename files and some functions
- Add more tests
- User can define property names
- Support more config files
- Add Babel??? :thinking:
- Publish it to npm

### License
[See License](/LICENSE)

### Project Status
Work in Progress
