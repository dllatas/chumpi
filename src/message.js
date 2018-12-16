const message = {
  'help-direct': `usage: teseo [-d path] [-f value] [-n value] [-m value] [-w path]
where:
  -d: path to files (mandatory).
  -f: file format (mandatory)
  -n: table name label (optional, default: name)
  -m: table dependencies label (optional, default: master)
  -w: output path (optional, default /tmp/teseo)

usage: teseo [--dir path] [--file value] [--name value] [--master value] [--write path]
where:
  --dir: path to files (mandatory).
  --format: file format (mandatory)
  --name: table name label (optional, default: name)
  --master: table dependencies label (optional, default: master)
  --write: output path (optional, default /tmp/teseo)

usage: teseo [path] [format]
where:
  path: path to files
  format: file format

display help menu
  teseo [-h]
  teseo [--help]`,
  'help': `Invalid argument(s)!

display help menu
  teseo [-h]
  teseo [--help]`,
};

module.exports = {
  message,  
};
