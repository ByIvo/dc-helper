(function () {
  'use strict';

  angular
    .module({{fullModule}})
    .factory('{{name}}Resource', {{name}}Resource);

  {{name}}Resource.$inject = [
    'RESTFulHelperFactory',
    'apiService'
  ];

  function {{name}}Resource(
    RESTFulHelperFactory,
    apiService
  ) {

    var baseUrl = apiService.getApi('{{moduleName}}').baseUrl;
    var resourceName = '/{{lowercase name}}/:id';
    var url = baseUrl + resourceName;

    var config = {

    };

    return RESTFulHelperFactory.configureRESTFulResource(url, config);
  }
})();
