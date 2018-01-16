#!/usr/bin/env node
'use strict';

function MigrationNameResolver() {}

MigrationNameResolver.prototype.resolve = function (module, projectPath) {
  var moduleNameHelper = require('./module-name-helper.js');
  var mavenVersionResolver = require('./maven-version-resolver.js');
  var migrationSequenceResolver = require('./migration-sequence-resolver.js');

  var moduleRevised = moduleNameHelper.revise(module, projectPath);
  var version = mavenVersionResolver.retrieveVersion(moduleRevised, projectPath);
  var creationPath = moduleNameHelper.makeCreationPath(moduleRevised, projectPath);
  var migrationSequence = migrationSequenceResolver.defineNextMigration(moduleRevised, creationPath, version);

  return this.createPaths(moduleRevised, creationPath, version, migrationSequence);
};

MigrationNameResolver.prototype.createPaths = function (moduleRevised, creationPath, version, migrationSequence) {
  var path = require('path');

  var migrationName = moduleRevised + '-' + version +  migrationSequence;
  var migrationPath = path.join(creationPath, migrationName);

  var baseEnd = ['__oracle.sql','__postgre.sql'];
  return baseEnd.map(function (item) {
    return migrationPath + item;
  });
};

module.exports = MigrationNameResolver;
