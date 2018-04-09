(function () {
  'use strict';

  angular
    .module('cw.faturamento.tabelaProdutoFornecedor')
    .factory('tabelaProdutoFornecedorResource', tabelaProdutoFornecedorResource);

  tabelaProdutoFornecedorResource.$inject = [
    'RESTFulHelperFactory',
    'apiService'
  ];

  function tabelaProdutoFornecedorResource(
    RESTFulHelperFactory,
    apiService
  ) {

    var baseUrl = apiService.getApi('faturamento').baseUrl;
    var resourceName = '/tabelaprodutofornecedor/:id';
    var url = baseUrl + resourceName;

    return RESTFulHelperFactory.configureRESTFulResource(url);
  }
})();
