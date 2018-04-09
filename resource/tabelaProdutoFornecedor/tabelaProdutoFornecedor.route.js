(function () {
  'use strict';

  angular
    .module('cw.faturamento.tabelaProdutoFornecedor')
    .run(tabelaProdutoFornecedor);

  tabelaProdutoFornecedor.$inject = [
    'routerHelper',
    'tabelaProdutoFornecedorRouteConstants'
  ];

  function tabelaProdutoFornecedor(
    routerHelper,
    tabelaProdutoFornecedorRouteConstants
  ) {
    routerHelper.configureStates(tabelaProdutoFornecedorRouteConstants);
  }

})();
