(function () {
  'use strict';

  angular
    .module({{fullModule}})
    .factory('{{name}}RouteConstants', {{name}}RouteConstants);

  {{name}}RouteConstants.$inject = [
    'apiService'
  ];

  function {{name}}RouteConstants(
    apiService
  ) {
    return {
      '{{name}}' : {
        state: '{{moduleAbrev}}.{{name}}',
        config: {
          url: '/{{urlify name}}',
          templateUrl: '{{moduleName}}/{{name}}/{{name}}.html',
          resolve : {
            loadDependencies: ['loadModulesService', function (loadModulesService) {
              return loadModulesService.loadFiles(getDependencies());
            }]
          }
        }
      },

      'createEdit': {
        state: '{{moduleAbrev}}.{{name}}.createEdit',
        config: {
          url: '/:id/:tab',
          templateUrl: apiService.getPath('genericCrudCreateEdit')
        }
      }
    };

    function getDependencies() {
      return [
        '{{moduleName}}/{{name}}/{{name}}.min.js',
      ];
    }
  }
})();
