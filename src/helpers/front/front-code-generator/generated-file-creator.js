#!/usr/bin/env node
'use strict';

module.exports = {
  generate: function (generatedCodes, context) {
    var path = require('path');
    var fs = require('fs');

    for(var i=0;i<generatedCodes.length;i++) {
      var generatedCode = generatedCodes[i];

      var finalPath = path.join(context.projectPath, generatedCode.fileName);
      console.log('writting in >> ' + finalPath);
      fs.writeFileSync(finalPath, generatedCode.fileContent, 'utf8');
    }
  }
};
