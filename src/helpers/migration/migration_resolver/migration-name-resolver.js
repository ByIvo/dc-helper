#!/usr/bin/env node
'use strict';

module.exports = function (projectPaths, moduleName, callback) {
  var winston = require('winston');
  winston.log('info', 'Iniciando resolução do caminho final das migrations');

  var migrationNameFinder = require('./migration-name-finder.js');

  migrationNameFinder(projectPaths, moduleName, function (basicNameMigration) {
    var migrationName = finishMigratioNameProccess(projectPaths, basicNameMigration);
    callback(migrationName);
  });

};

function finishMigratioNameProccess(projectPaths, basicNameMigration) {
  var winston = require('winston');
  winston.log('info', 'Nome básico para a migration definido como "%s"', basicNameMigration);

  var existingMigrationCounter = require('./existing-migration-counter.js');
  var qntExistingMigrations = existingMigrationCounter(projectPaths, basicNameMigration);
  winston.log('info', 'Foram encontradas outras "%d" migrations existentes', qntExistingMigrations);

  var migrationName = defineFinalMigrationName(basicNameMigration, qntExistingMigrations);
  winston.log('info', 'O nome definitivo para a migration é "%s"', migrationName);

  return migrationName;
}

function defineFinalMigrationName(basicNameMigration, qntExistingMigrations) {
  if(qntExistingMigrations === 0) {
    return basicNameMigration;
  } else {
    return basicNameMigration + '-' + qntExistingMigrations;
  }
}
