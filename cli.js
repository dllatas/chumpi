#!/usr/bin/env node
const { cli } = require('./src');

async function _cli(input) {
  try {
    const result = await cli(input);
    if (result.console) {
      console.log(result.message);
      return;
    }
    console.info(`Teseo escaped the Labyrinth! Open the file at ${result}`);
  } catch (e) {
    console.log(e);
  }
}

_cli(process.argv);
