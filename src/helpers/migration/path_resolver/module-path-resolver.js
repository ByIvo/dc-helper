#!/usr/bin/env node
'use strict';
module.exports = function (parentModulePath, moduleName) {
  var fs = require('fs');
  var winston = require('winston');
  var path = require('path');

  winston.log('info', 'Iniciando processo de resolução do nome do Módulo');
  var moduleProjectName = prepareCommonModuleName(moduleName);
  var moduleProjectPath = path.format({
    dir: parentModulePath,
    base: moduleProjectName
  });

  winston.log('info', 'Caminho do módulo definido como "%s"', moduleProjectPath);

  var moduleStat = fs.statSync(moduleProjectPath);

  if(!moduleStat.isDirectory()) {
    throw Error('Não foi possível identificar o projeto Common para o módulo "%s"', moduleName);
  }

  return moduleProjectPath;
};

function prepareCommonModuleName(moduleName) {
  return moduleName + 'Common';
}
