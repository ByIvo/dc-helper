#!/usr/bin/env node
'use strict';

function MigrationHelper() {}

MigrationHelper.prototype.generateMigration = function (module, projectPath) {
  
  module = moduleAdjusted(module);
  
  var extractMigrationPaths = require('./path_resolver/extract-migration-paths.js');
  var migrationNameResolver = require('./migration_resolver/migration-name-resolver.js');
  var migrationCreator = require('./migration_creator/migration-creator.js');

  var projectPaths = extractMigrationPaths(module, projectPath);
  migrationNameResolver(projectPaths, module, function (migrationName) {
    migrationCreator.create(projectPaths, migrationName);
  });

  function moduleAdjusted(module) {
    return new String(module).replace('-Parent', '');
  }

};

module.exports = MigrationHelper;
