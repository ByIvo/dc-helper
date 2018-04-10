#!/usr/bin/env node
'use strict';

module.exports = {
  name: 'fullModule',
  action: function () {
    return 'cw.' + this.moduleName + '.' + this.name;
  }
};
