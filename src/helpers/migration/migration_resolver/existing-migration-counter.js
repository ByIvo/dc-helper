#!/usr/bin/env node
'use strict';

module.exports = function (projectPaths, basicNameMigration) {
  var winston = require('winston');
  var fs = require('fs');

  winston.log('info', 'Procurando migrations existentes');
  var files = fs.readdirSync(projectPaths.migrationPath);

  var regExp = new RegExp(basicNameMigration);
  var matchedFiles = files.filter(function (file) {
    return regExp.test(file);
  });

  var count = matchedFiles.length;

  if(count % 2 !== 0) {
    throw Error('A contagens de migrations resultou em um número ímpar de ocorrências');
  }

  return count / 2;
};
