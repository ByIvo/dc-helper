#!/usr/bin/env node
'use strict';

module.exports = {
  revise: revise,
  makeParentName: makeParentName,
  makeCreationPath: makeCreationPath
};

function revise(moduleUnrevised) {
  if(!moduleUnrevised) return '';
  var firstLetter = moduleUnrevised.charAt(0).toUpperCase();
  var loweredLetters = moduleUnrevised.slice(1).toLowerCase();

  return firstLetter + loweredLetters;
}

function makeParentName(moduleRevised, projectPath) {
  var path = require('path');

  var pathObject = path.parse(projectPath);
  var parentProjectName = moduleRevised + '-Parent';

  return path.join(path.format(pathObject), parentProjectName);
}

function makeCreationPath(moduleRevised, projectPath) {
  var path = require('path');

  var parentProjectPath = makeParentName(moduleRevised, projectPath);
  var projectName = moduleRevised + 'Common';
  var directory = 'sql';
  return path.join(parentProjectPath, projectName, directory);
}
