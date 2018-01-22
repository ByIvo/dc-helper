#!/usr/bin/env node
'use strict';
module.exports = function (modulePathResolver) {
  var fs = require('fs');
  var winston = require('winston');
  var path = require('path');

  winston.log('info', 'Iniciando processo de resolução do path da migration');
  var migrationPath = path.format({
    dir: modulePathResolver,
    base: 'sql'
  });

  winston.log('info', 'Caminho do path da migração definido como "%s"', migrationPath);

  var migrationStat = fs.statSync(migrationPath);

  if(!migrationStat.isDirectory()) {
    throw Error('Não foi possível encontrar o path definido para a nova migração');
  }

  return migrationPath;
};
