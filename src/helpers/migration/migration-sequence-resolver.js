#!/usr/bin/env node
'use strict';

module.exports = {
  defineNextMigration : defineNextMigration
};

function defineNextMigration(moduleRevised, creationPath, version) {
  var fs = require('fs');

  var files = fs.readdirSync(creationPath);
}
