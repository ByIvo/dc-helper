#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('./../package.json');

program
  .version(pkg.version)
  .command('migration <module>', 'Cria migration para o Módulo informado')
  .parse(process.argv);
