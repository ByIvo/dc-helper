#!/usr/bin/env node
'use strict';

module.exports = function () {
  var Handlebars = require('handlebars');
  //pode ser lido os arquivos desse diretório e somente excluído ele mesmo da lista
  var helpers = [
    './fullModule.helper.js',
    './lowercase.helper.js',
    './urlify.helper.js',
    './capitalized.helper.js',
  ];

  for(var i=0; i<helpers.length; i++) {
    var helper = require(helpers[i]);
    Handlebars.registerHelper(helper.name, helper.action);
  }
};
