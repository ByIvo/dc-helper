#!/usr/bin/env node
'use strict';

module.exports = function (projectPath) {
  var path = require('path');
  var fs = require('fs');
  var winston = require('winston');

  var stat = fs.statSync(projectPath);

  if(stat.isDirectory()) {
    winston.log('info', 'Caminho do CooperateEE confimado como diretório');
    var projectBasename = path.basename(projectPath);
    if(projectBasename == 'CooperateEE') {
      return projectPath;
    } else {
      throw Error("Caminho informado não corresponde com o diretório do projeto CooperateEE");
    }
  } else {
    throw Error("Caminho informado não é um diretório");
  }
};
