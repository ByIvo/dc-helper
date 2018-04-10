(function () {
  'use strict';

  angular
    .module({{fullModule}})
    .run({{name}});

  {{name}}.$inject = [
    'routerHelper',
    '{{name}}RouteConstants'
  ];

  function {{name}}(
    routerHelper,
    {{name}}RouteConstants
  ) {
    routerHelper.configureStates({{name}}RouteConstants);
  }

})();
