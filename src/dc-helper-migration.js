#!/usr/bin/env node
'use strict';

var program = require('commander');
var MigrationHelper = require('./helpers/migration/migration-helper.js');

program
  .option('-p, --path <path>', 'Cooperate Project\'s Path')
  .parse(process.argv);

var args = program.args;

var module = args[0];
var projectPath = program.path;

if(!module) {
  throw Error("Nenhum módulo foi informado.");
} else if(!projectPath) {
  throw Error("Caminho do projeto CooperateEE não informado.");
} else {
  var migrationHelper = new MigrationHelper();
  migrationHelper.generateMigration(module, projectPath);
}
