#!/usr/bin/env node
'use strict';

module.exports = {
  assemble: function (module, name, projectPath) {
    var abrevs = {
      faturamento: 'FAT'
    };

    return {
      moduleAbrev: abrevs[module],
      moduleName: module,
      name: name,
      projectPath: projectPath
    };
  }
};
