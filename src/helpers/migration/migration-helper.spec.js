(function () {
  'use strict';
  var MigrationHelper = require('./migration-helper.js');
  var MigrationNameResolver = require('./migration-name-resolver.js');

  var sinon = require('sinon');
  var chai = require('chai');
  var sinonChai = require("sinon-chai");
  var expect = chai.expect;
  chai.use(sinonChai);

  beforeEach(function () {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    this.sandbox.restore();
  });

  describe('MigrationHelper module', function () {

    it('should create file with resolved names', function () {
      var migrationHelper = new MigrationHelper();
      var migrationNameResolver = sinon.stub(MigrationNameResolver.prototype, 'resolve');
      var fs = require('fs');

      var module = 'fiscal';
      var projectPath =  '/home/datacoper/projects/CooperateEE';

      migrationNameResolver.withArgs(module, projectPath).returns([
        '/home/datacoper/projects/CooperateEE/Fiscal-Parent/FiscalCommon/sql/Fiscal-1.33.0__oracle.sql',
        '/home/datacoper/projects/CooperateEE/Fiscal-Parent/FiscalCommon/sql/Fiscal-1.33.0__postgre.sql'
      ]);

      var writeFileStub = this.sandbox.stub(fs, 'writeFileSync');

      migrationHelper.generateMigration(module, projectPath);

      expect(writeFileStub).to.be.calledWith('/home/datacoper/projects/CooperateEE/Fiscal-Parent/FiscalCommon/sql/Fiscal-1.33.0__oracle.sql', '');
      expect(writeFileStub).to.be.calledWith('/home/datacoper/projects/CooperateEE/Fiscal-Parent/FiscalCommon/sql/Fiscal-1.33.0__postgre.sql', '');
    });
  });
})();
