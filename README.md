# Teseo
 
Teseo reads a directory that contains a relational db schema defined in several config files. 

Each config file defines a table, therefore it has a property that has a name and another optional 
property in case the table has master tables.

Teseo will provide the order in which the tables should be created in a db to avoid issues around
a detail not having a master.

Teseo is the spanish name for the mythical greek king Theseus. He managed to find his way in the 
Labyrinth, similar to the library finding the order of the files.

### Installation

Nodejs v10.0.0+ is needed. Teseo has not been tested against earlier versions.

1. `git clone https://github.com/dllatas/teseo.git`
2. `cd teseo`
3. `npm start`

### Usage

#### Properties
- dir: mandatory. string.
- format: mandatory. string.
- master: optional. default = 'master'. string.
- name: optional. default = 'name'. string.
- dest: optional. default = 'output'. string.

#### CLI
```bash
cd teseo
node teseo-cli dir=/home/db-schema format=yaml

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
- Wait for review!

### Roadmap
- Allow for nested property to be used as name and dependencies
- Support more config files
- Add Babel??? :thinking:
- Publish it to npm

### License
[See License](/LICENSE)

### Project Status
Work in Progress
