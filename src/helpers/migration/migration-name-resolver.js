#!/usr/bin/env node
'use strict';

function MigrationNameResolver() {}

MigrationNameResolver.prototype.resolve = function (module, projectPath) {
  var moduleNameHelper = require('./module-name-helper.js');
  moduleNameHelper.revise(module);
};

module.exports = MigrationNameResolver;
