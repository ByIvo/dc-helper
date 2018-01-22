#!/usr/bin/env node
'use strict';

module.exports = function (module, projectPath) {
    var winston = require('winston');

    winston.log('info', 'Iniciando processo de criação de migração para o Módulo "%s".', module);
    winston.log('info', 'Caminho do CooperateEE ficou definido como: %s.', projectPath);

    var cooperatePathResolver = require('./cooperate-path-resolver.js');
    var cooperatePath = cooperatePathResolver(projectPath);

    var parentModulePathResolver = require('./parent-module-path-resolver.js');
    var parentModulePath = parentModulePathResolver(cooperatePath, module);

    var modulePathResolver = require('./module-path-resolver.js');
    var modulePath = modulePathResolver(parentModulePath, module);

    var migrationPathResolver = require('./migration-path-resolver.js');
    var migrationPath = migrationPathResolver(modulePath);

    var retorno =  {
      cooperatePath: cooperatePath,
      parentModulePath: parentModulePath,
      modulePath: modulePath,
      migrationPath: migrationPath
    };

    winston.log('info', 'Paths resolvidos com sucesso: %s', JSON.stringify(retorno));

    return retorno;
};
