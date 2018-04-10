#!/usr/bin/env node
'use strict';

function FrontHelper(projectPath) {
  this._projectPath = projectPath;
}

module.exports = FrontHelper;

FrontHelper.prototype.generateCodeTo = function (module, name) {
  var setupHandlebarHelpers = require('./handlebars-helpers/helpers.js');
  var contextAssembler = require('./context-assembler.js');
  var frontCodeGenerator = require('./front-code-generator/front-code-generator.js');

  setupHandlebarHelpers();

  var context = contextAssembler.assemble(module, name, this._projectPath);
  frontCodeGenerator.generateFrom(context);
};
