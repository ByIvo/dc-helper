(function () {
  'use strict';

  angular
    .module('cw.faturamento.tabelaProdutoFornecedor')
    .factory('tabelaProdutoFornecedorRouteConstants', tabelaProdutoFornecedorRouteConstants);

  tabelaProdutoFornecedorRouteConstants.$inject = [
    'apiService'
  ];

  function tabelaProdutoFornecedorRouteConstants(
    apiService
  ) {
    return {
      'tabelaProdutoFornecedor' : {
        state: 'FAT.tabelaProdutoFornecedor',
        config: {
          url: '/tabela-produto-fornecedor',
          templateUrl: 'faturamento/tabelaProdutoFornecedor/tabelaProdutoFornecedor.html',
          resolve : {
            loadDependencies: ['loadModulesService', function (loadModulesService) {
              return loadModulesService.loadFiles(getDependencies());
            }]
          }
        }
      },

      'createEdit': {
        state: 'FAT.tabelaProdutoFornecedor.createEdit',
        config: {
          url: '/:id/:tab',
          templateUrl: apiService.getPath('genericCrudCreateEdit')
        }
      }
    };

    function getDependencies() {
      return [
        'faturamento/tabelaProdutoFornecedor/tabelaProdutoFornecedor.min.js',
        'faturamento/tabelaProdutoFornecedor/tabelaProdutoFornecFilial/tabelaProdutoFornecFilial.min.js',
        'faturamento/tabelaProdutoFornecedor/tabelaProdutoFornecProduto/tabelaProdutoFornecProduto.min.js',
        'faturamento/faturamentoResource/faturamentoResource.min.js',
        'core/coreResources/coreResources.min.js'
      ];
    }
  }
})();
