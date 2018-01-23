#!/usr/bin/env node
'use strict';

module.exports = function (projectPaths,moduleName, callback) {
  var path = require('path');
  var winston = require('winston');
  var pomParser = require("pom-parser");

  var pomPath = path.format({
    dir: projectPaths.modulePath,
    base: 'pom.xml'
  });

  winston.log('info', 'Resolvendo versão no arquivo "%s"', pomPath);

  var opts = {
    filePath: pomPath
  };

  pomParser.parse(opts, function (err, pomResponse) {
    if(err) {
      throw Error(err);
    }

   var version = resolverVersao(pomResponse);
   var preparedVersion = prepareVersion(version);
   var moduleNamePrepared = prepareName(moduleName);

   callback(moduleNamePrepared + '-' + preparedVersion);
  });
};

function resolverVersao(pomResponse) {
    var project = pomResponse.pomObject.project;
    var version = project.version || project.parent.version;
    
    if(!version) {
      throw Error("Não foi possível resolver a versão no arquivo pom encontrado.");
    }
    
    return version;
}

function prepareVersion(version) {
  var indexOfSnapshot = version.toUpperCase().indexOf('-SNAPSHOT');
  return version.slice(0, indexOfSnapshot);
}

function prepareName(moduleName) {
  return moduleName.toUpperCase().charAt(0) +
    moduleName.toLowerCase().slice(1);
}
