#!/usr/bin/env node
'use strict';

function MigrationHelper() {}

module.exports = MigrationHelper;

MigrationHelper.prototype.generateMigration = function (module, projectPath) {
  var MigrationNameResolver = require('./migration-name-resolver.js');
  var fs = require('fs');

  var migrationNameResolver = new MigrationNameResolver();
  var filesToBeCreated = migrationNameResolver.resolve(module, projectPath);

  var createFiles = function (url) {
    fs.writeFileSync(url, '');
  };

  filesToBeCreated.forEach(createFiles);
};
