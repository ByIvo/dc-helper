#!/usr/bin/env node
'use strict';

var program = require('commander');
var BackHelper = require('./helpers/back/back-helper.js');

program
  .option('-p, --path [path]', 'Cooperate Project\'s Path')
  .parse(process.argv);

var args = program.args;

var module = args[0];
var name = args[1];

var projectPath = program.path || process.cwd();

if(!module) {
  throw Error("Nenhum módulo foi informado.");
} else if(!name) {
  throw Error("Nome do case não informado.");
} else if(!projectPath) {
  throw Error("Caminho do projeto CooperateEE não informado.");
} else {
  var backHelper = new BackHelper(projectPath);
  backHelper.generateCodeTo(module, name);
}
