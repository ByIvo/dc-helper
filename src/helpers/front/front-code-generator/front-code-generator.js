#!/usr/bin/env node
'use strict';
module.exports = {
  generateFrom: function (context) {
    var templatesCompiler = require('./templates-compiler.js');
    var generatedFileCreator = require('./generated-file-creator.js');

    var generatedCode = templatesCompiler.compileTo(context);
    generatedFileCreator.generate(generatedCode, context);
  }
};
