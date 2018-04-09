(function () {
    'use strict';

    angular
        .module('cw.faturamento')
        .run(faturamentoRun);

    faturamentoRun.$inject = [
        'routerHelper',
        'faturamentoRouteConstants',
        'loadModulesService'
    ];

    function faturamentoRun(
        routerHelper,
        faturamentoRouteConstants,
        loadModulesService
    ) {
        routerHelper.configureStates(faturamentoRouteConstants);

        loadModulesService.loadRoutes([
            'faturamento/confAprovacaoPedidoCompra/confAprovacaoPedidoCompra.route.min.js',
            'faturamento/pedidoCompra/gerenciarPedidoCompra/gerenciarPedidoCompra.route.min.js',
            'faturamento/pedidoCompra/listarPedidoCompra/listarPedidoCompra.route.min.js',
            'faturamento/confGeralCompras/confGeralCompras.route.min.js',
            'faturamento/configTipoPedidoCompra/configTipoPedidoCompra.route.min.js',
            'faturamento/confGeralCompras/confGeralCompras.route.min.js',
            'faturamento/tipoMovimentoNegociacaoOperacaoInterna/tipoMovimentoNegociacaoOperacaoInterna.route.min.js',
            'faturamento/consultaSaldoNegociacao/consultaSaldoNegociacao.route.min.js',
            'faturamento/registroNegociacao/registroNegociacao.route.min.js',
            'faturamento/configFatTipoNegociacao/configFatTipoNegociacao.route.min.js',
            'faturamento/faturamentoNegociacao/faturamentoNegociacao.route.min.js',
            'faturamento/vinculoPedidoCompraNotaTerceiro/vinculoPedidoCompraNotaTerceiro.route.min.js',
            'faturamento/aprovacaoPedidoCompra/aprovacaoPedidoCompra.route.min.js',
		    'faturamento/equipeCarregamento/equipeCarregamento.route.min.js',
            'faturamento/configOrdemFaturamento/configOrdemFaturamento.route.min.js',
            'faturamento/ordemFaturamento/ordemFaturamento.route.min.js',
            'faturamento/separacaoOrdemFaturamento/separacaoOrdemFaturamento.route.min.js',
            'faturamento/statusOrdemFaturamento/statusOrdemFaturamento.route.min.js',
            'faturamento/tabelaProdutoFornecedor/tabelaProdutoFornecedor.route.min.js',
            'faturamento/confFilaAutCarregamento/confFilaAutCarregamento.route.min.js',
            'faturamento/consultaFilaAutorizacaoCarregamento/consultaFilaAutorizacaoCarregamento.route.min.js'
        ]);
    }
})();
