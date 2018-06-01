(function() {
    'use strict';

    function ContextWrapper(context) {
        this._context = context;
    }

    module.exports = ContextWrapper;

    ContextWrapper.prototype.findProject = function(projectName) {
        var context = this._context;

        var projectContext = recursivelyLookToFindProject(projectName, context);

        if(projectContext) {
            return projectContext;
        } else {
            throw new Error("Não foi possível encontrar o Projeto " + projectName);
        }
    };

    function recursivelyLookToFindProject(projectName, context) {
        if(verifyIfContextNodeIsTheExpectedProject(projectName, context)) {
            return context;
        }

        return seekForProjectIntoBranchesOf(projectName, context.branches);
    }

    function seekForProjectIntoBranchesOf(projectName, branches) {
        for(var i=0; i<branches.length; i++) {
            var wantedContext = recursivelyLookToFindProject(projectName, branches[i]);
            
            if(wantedContext) {
                return wantedContext;
            }
        }
    }

    function verifyIfContextNodeIsTheExpectedProject(expectedProjectName, contextNode) {
        var isProject = !!contextNode.project;
        var projectName = contextNode.name;

        return isProject && projectName === expectedProjectName;
    }

    ContextWrapper.prototype.findFirstWithProperty = function(propertyName) {
        
    };
})();


