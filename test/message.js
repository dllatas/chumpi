const message = {
  help: `Usage: teseo [OPTION]

  -d, --dir
        Path to files (mandatory).
  -f, --format
        File format (mandatory)
  -n, --name
        Table name label (optional, default: name)
  -m, --master
        Table dependencies label (optional, default: master)
  -o, --output
        Output path (optional, default /tmp/teseo)

Usage: teseo [OPTION]

  -h, --help
        Display help menu`,
  warning: `Invalid argument(s)!

Usage: teseo [OPTION]

  -h, --help
        Display help menu`,
};

module.exports = {
  message,
};
