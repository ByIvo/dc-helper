#!/usr/bin/env node
'use strict';
module.exports = function (cooperatePath, moduleName) {
  var fs = require('fs');
  var winston = require('winston');
  var path = require('path');

  winston.log('info', 'Iniciando processo de resolução do nome do módulo Parent');
  var parentProjectName = prepareParentName(moduleName);
  var parentProjectPath = path.format({
    dir: cooperatePath,
    base: parentProjectName
  });

  winston.log('info', 'Projeto Parent definido como "%s"', parentProjectPath);

  var parentStat = fs.statSync(parentProjectPath);

  if(!parentStat.isDirectory()) {
    throw Error('Não foi possível identificar o projeto Parent para o módulo "%s"', moduleName);
  }

  return parentProjectPath;
};

function prepareParentName(moduleName) {
  return moduleName + '-Parent';
}
