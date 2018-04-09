(function () {
    'use strict';

    angular
        .module('cw.faturamento.tabelaProdutoFornecedor')
        .factory('tabelaProdutoFornecProdutoResource', tabelaProdutoFornecProdutoResource);

    tabelaProdutoFornecProdutoResource.$inject = [
        'RESTFulHelperFactory',
        'apiService'
    ];

    function tabelaProdutoFornecProdutoResource(
        RESTFulHelperFactory,
        apiService
    ) {
        var baseUrl = apiService.getApi('faturamento').baseUrl;
        var resourceName = '/tabelaprodutofornecedor/:parentId/tabelaprodutofornecproduto';
        var extendedUrl = baseUrl + resourceName;
        var path = resourceName + '/:id';
        var url = baseUrl + path;
    

       var config = { 
               getCalculos: {method: 'POST', url: extendedUrl + "/calculos", isArray: false} 
           };
        

        return RESTFulHelperFactory.configureRESTFulResource(url, config);
    }
})();
