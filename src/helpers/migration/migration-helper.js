#!/usr/bin/env node
'use strict';

function MigrationHelper() {}

MigrationHelper.prototype.generateMigration = function (module, projectPath) {
  var extractMigrationPaths = require('./path_resolver/extract-migration-paths.js');
  var migrationNameResolver = require('./migration_resolver/migration-name-resolver.js');
  // var migrationCreator = require('.migration-creator.js');

  var projectPaths = extractMigrationPaths(module, projectPath);
  var migrationName = migrationNameResolver(projectPaths);
  console.log(migrationName);
  // migrationCreator.create(projectPaths, migrationName);
};

module.exports = MigrationHelper;
