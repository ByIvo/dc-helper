#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('./../package.json');
var winston = require('winston');

program
  .version(pkg.version)
  .command('migration <module>', 'Criar migration para o Módulo informado')
  .command('front <module> <name>', 'Criar a estrutura básica do frontend do CooperateAngular')
  .parse(process.argv);
