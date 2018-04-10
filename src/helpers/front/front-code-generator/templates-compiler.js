#!/usr/bin/env node
'use strict';

module.exports = {
  compileTo: function (context) {
    var Handlebars = require('handlebars');
    var path = require('path');
    var fs = require('fs');

    var relativeTemplatePath = './../../../../resources/front/templates';
    var templates = [
      path.join(relativeTemplatePath, 'controller.tmpl.js'),
      path.join(relativeTemplatePath, 'main.service.tmpl.js'),
      path.join(relativeTemplatePath, 'module.tmpl.js'),
      path.join(relativeTemplatePath, 'resource.tmpl.js'),
      path.join(relativeTemplatePath, 'route.factory.tmpl.js'),
      path.join(relativeTemplatePath, 'route.tmpl.js'),
      path.join(relativeTemplatePath, 'tmpl.html'),
    ];

    var generatedCode = [];

    for(var i=0;i<templates.length;i++) {
      var sourcePath = require.resolve(templates[i]);
      var source = fs.readFileSync(sourcePath, 'utf8');
      var dirtyFilename = path.parse(sourcePath).base;

      var template = Handlebars.compile(source);

      var code = template(context);
      var fileName = context.name + '.' + cleanFilename(dirtyFilename);

      generatedCode.push({
        fileName: fileName,
        fileContent: code
      });
    }

    return generatedCode;
  }
};

function cleanFilename(dirtyFilename) {
  return dirtyFilename.replace(/tmpl\.?/, '');
}
