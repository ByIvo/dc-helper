(function () {
  'use strict';
  var expect = require('chai').expect;

  describe('Module Name helper', function () {
    it('Should return Parent Project Name correctly', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var parentProjectName = moduleNameHelper.makeParentName('Module', '/home/test/');
      expect(parentProjectName).to.be.equal('/home/test/Module-Parent');
    });

    it('Should return Common Project named path', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var projectName = moduleNameHelper.makeCreationPath('Module', '/home/test/');
      expect(projectName).to.be.equal('/home/test/Module-Parent/ModuleCommon/sql');
    });

    it('Should return First letter capitalized and the rest in lowercase', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var moduleRevised = moduleNameHelper.revise('module');
      expect(moduleRevised).to.be.equal('Module');
    });

    it('Should return First letter capitalized and the rest in lowercase even when all letters are capitalized', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var moduleRevised = moduleNameHelper.revise('MODULE');
      expect(moduleRevised).to.be.equal('Module');
    });

    it('Should return empty if the module name is empty', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var moduleRevised = moduleNameHelper.revise('');
      expect(moduleRevised).to.be.equal('');
    });

    it('Should return the first letter capitalized if the module name is an one char string', function () {
      var moduleNameHelper = require('./module-name-helper.js');

      var moduleRevised = moduleNameHelper.revise('m');
      expect(moduleRevised).to.be.equal('M');
    });
  });
})();
