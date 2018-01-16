function MavenVersionResolver() {

}

MavenVersionResolver.prototype.retrieveVersion = function (moduleRevised, projectPath) {
   var moduleNameHelper = require('./module-name-helper.js');
   var parentProjectPath = moduleNameHelper.makeParentName(moduleRevised, projectPath);
};

module.exports = MavenVersionResolver;
