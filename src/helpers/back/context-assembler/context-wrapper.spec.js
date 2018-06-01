var chai = require('chai');
var expect = chai.expect;

describe("Context Wrapper", function() {
    var ContextWrapper = require('./context-wrapper.js');

    it("Should return the first context node because it has the same name and has the isProject property", function() {
        var context = {
            project: true,
            name: 'fakeProjectName'
        };

        var contextWrapper = new ContextWrapper(context);
        var projectContext = contextWrapper.findProject('fakeProjectName');

        expect(projectContext).to.deep.equal(context);
    });

    it("If the first context node is not a candidate, should look into its own branches", function() {
        var rightContext = {
            project: true,
            name: 'fakeProjectName'
        };

        var context = {
            name: 'noName',
            branches: [
                rightContext
            ]
        }

        var contextWrapper = new ContextWrapper(context);
        var projectContext = contextWrapper.findProject('fakeProjectName');

        expect(projectContext).to.deep.equal(rightContext);
    });

    it("Should look for a context in all children branches", function() {
        var rightContext = {
            project: true,
            name: 'fakeProjectName'
        };

        var context = {
            name: 'noName',
            branches: [{
                name: 'anotherContextNode',
                branches: [
                    rightContext
                ]
            }]
        }

        var contextWrapper = new ContextWrapper(context);
        var projectContext = contextWrapper.findProject('fakeProjectName');

        expect(projectContext).to.deep.equal(rightContext);
    });

    it("Should return an error if do not find any candidate context", function() {
        var wrongContext = {
            project: false,
            name: 'fakeProjectName',
            branches: []
        };

        var contextWrapper = new ContextWrapper(wrongContext);

        expect(function() {
            contextWrapper.findProject('fakeProjectName')
        }).to.throw("Não foi possível encontrar o Projeto fakeProjectName");
    });
})