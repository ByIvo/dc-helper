(function () {
    'use strict';

    angular
        .module('cw.faturamento.tabelaProdutoFornecedor')
        .factory('tabelaProdutoFornecFilialResource', tabelaProdutoFornecFilialResource);

    tabelaProdutoFornecFilialResource.$inject = [
        'RESTFulHelperFactory',
        'apiService'
    ];

    function tabelaProdutoFornecFilialResource(
        RESTFulHelperFactory,
        apiService
    ) {
        var baseUrl = apiService.getApi('faturamento').baseUrl;
        var path = '/tabelaprodutofornecedor/:parentId/tabelaprodutofornecfilial/:id';
        var url = baseUrl + path;

        return RESTFulHelperFactory.configureRESTFulResource(url);
    }
})();
