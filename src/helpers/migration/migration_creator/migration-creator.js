#!/usr/bin/env node
'use strict';

module.exports = {
  create: function (projectPaths, migrationName) {
    var path = require('path');
    var winston = require('winston');

    winston.log('info', 'Iniciando processo de criação das migrações');
    var oracleMigration = path.format({
      dir: projectPaths.migrationPath,
      base: migrationName + "__oracle.sql"
    });

    var postgreMigration = path.format({
      dir: projectPaths.migrationPath,
      base: migrationName + "__postgre.sql"
    });

    winston.log('info', 'Criando as migrações "%s" e "%s"', oracleMigration, postgreMigration);

    createMigrationFileIfNotExists(oracleMigration);
    createMigrationFileIfNotExists(postgreMigration);

    winston.log('info', 'MIGRATION CRIADA COM SUCESSO: "%s"', migrationName);
  }
};

function createMigrationFileIfNotExists(migrationPath) {
  var fs = require('fs');
  if(fs.existsSync(migrationPath)) {
    throw Error("Migration '%s' já existe", migrationPath);
  }

  fs.closeSync(fs.openSync(migrationPath, 'w'));
}
