(function () {
    'use strict';

    angular
        .module('cw.faturamento.tabelaProdutoFornecedor')
        .service('tabelaProdutoFornecProdutoService', tabelaProdutoFornecProdutoService);

    tabelaProdutoFornecProdutoService.$inject = [
         'tabelaProdutoFornecProdutoResource',
         'unidadeMedidaProdutoResource',
         'produtoFaturamentoResource',
         'tabelaProdutoFornecedorMainService',
         '$stateParams'
    ];

    function tabelaProdutoFornecProdutoService(
        tabelaProdutoFornecProdutoResource,
        unidadeMedidaProdutoResource,
        produtoFaturamentoResource,
        tabelaProdutoFornecedorMainService,
        $stateParams
    ) {
        var vm = this;
        var listingConfig;

        vm.getTabConfig = getTabConfig;

        activate();

        function getTabConfig() {
            var tab = new DcGenericCrudTabForm();
            tab.label('Produto');
            tab.fields(getFormFields());
            tab.modelProperty('tabelaProdutoFornecProduto');
            tab.listingConfig(listingConfig);
            tab.saveFn(saveTabelaProdutoFornecProduto);
            tab.editRequestFn(editTabelaProdutoFornecProduto);
            tab.deleteFn(deleteTabelaProdutoFornecProduto);

            return tab.toJSON();
        }

        function deleteTabelaProdutoFornecProduto(tabelaProdutoFornecProduto) {

            var params = {
                   id: tabelaProdutoFornecProduto.id,
                   parentId: getIdTabelaProdutoFornecedor()
                };

            return tabelaProdutoFornecProdutoResource.delete(params);
        }

        function getFormFields() {
            return [

              new DcGenericCrudField('calculatedField', 'Produto', 6, 'produto')
                 .filterSearchOptions(getFilterSearchOptions())
                 .querySearch(findProduto)
                 .onlyWhenNew(true)
                 .minSearchLength(0)
                 .require(true)
                 .onChange(onChangeProduto)
                 .toJSON(),
              new DcGenericCrudField('calculatedField', 'Und. Medida', 6, 'unidadeMedidaProduto')
                 .filterSearchOptions(getFilterSearchOptionsUnidadeMedida())
                 .querySearch(findUnidadeMedida)
                 .onlyWhenNew(true)
                 .minSearchLength(0)
                 .mainDataToShow(['sigla', 'descricao'])
                 .dependsOn('produto')
                 .require(true)
                 .onChange(buscarCamposCalculados)
                 .toJSON(),

              new DcGenericCrudField('text', 'Código do Produto no Parceiro', 3, 'codigoProdutoParceiro')
                 .toJSON(),
              new DcGenericCrudField('number', 'Quantidade da Embalagem', 3, 'quantidadeEmbalagem')
                 .decimalPlaces(2)
                 .toJSON(),
              new DcGenericCrudField('number', 'Custo Unitário', 3, 'custoUnitario')
                 .require(true)
                 .decimalPlaces(10)
                 .onChange(buscarCamposCalculados)
                 .toJSON(),
              new DcGenericCrudField('number', '% IPI', 3, 'percentualIPI')
                 .decimalPlaces(2)
                 .onChange(buscarCamposCalculados)
                 .toJSON(),
              new DcGenericCrudField('number', '% ICMS ST', 3, 'percentualIcmsSt')
                 .decimalPlaces(2)
                 .disable(true)
                 .toJSON(),
              new DcGenericCrudField('number', 'Custo Final', 3, 'custoFinal')
                 .decimalPlaces(10)
                 .disable(true)
                 .toJSON(),
              new DcGenericCrudField('number', 'Valor de Venda Simulado', 3, 'valorVendaSimulado')
                 .decimalPlaces(2)
                 .disable(true)
                 .toJSON(),
              new DcGenericCrudField('number', 'Margem Simulada', 3, 'margemSimulada')
                 .decimalPlaces(2)
                 .disable(true)
                 .toJSON(),

              new DcGenericCrudField('vigencia', null, 6)
                 .dateFormat('dd/MM/yyyy')
                 .requireInicio(true)
                 .onChange(buscarCamposCalculados)
                 .toJSON(),
              new DcGenericCrudField('empty', '', 1, 'empty')
                 .toJSON(),
              new DcGenericCrudField('boolean', 'Controla Custo de Compra', 3, 'controlaCustoCompra')
                 .toJSON()
            ];
        }

        function onChangeProduto(){
            var request = atualizarUnidadeMedida();
            if(request) {
                request.$promise.then(buscarCamposCalculados);
            }
        }

        function atualizarUnidadeMedida() {
            var modelProperty = tabelaProdutoFornecedorMainService.getModel().tabelaProdutoFornecProduto;
            var produto = modelProperty.produto;

            if(produto && produto.unidadeDeMedidaProdutoPrimaria) {
                var idUnidadeMedidaProduto = produto.unidadeDeMedidaProdutoPrimaria.id;

                return unidadeMedidaProdutoResource.get({id: idUnidadeMedidaProduto}, function(unidadeMedidaProduto) {

                    modelProperty.unidadeMedidaProduto = unidadeMedidaProduto;
                }, angular.noop);
            }
        }

        function buscarCamposCalculados(){

            var tabelaProdutoFornecProduto = tabelaProdutoFornecedorMainService.getModel().tabelaProdutoFornecProduto;
            
            var params = { parentId: getIdTabelaProdutoFornecedor()};

            tabelaProdutoFornecProdutoResource.getCalculos(params, tabelaProdutoFornecProduto, function(dados) {
                    
               tabelaProdutoFornecProduto.custoFinal = getValor(dados.custoFinal);
               tabelaProdutoFornecProduto.margemSimulada = getValor(dados.margemSimulada);
               tabelaProdutoFornecProduto.percentualIcmsSt = getValor(dados.percentualIcmsSt);
               tabelaProdutoFornecProduto.valorVendaSimulado = getValor(dados.valorVendaSimulado);
        
               }, angular.noop);
        } 

        function getValor(valor){
            if(valor) {
                return valor;
            }

            return 0;
        }
        
        function findProduto(params) {
            params = params || {};

            return produtoFaturamentoResource.getAtivos(params);
        }

        function findUnidadeMedida(params) {

            params = params || {};

            var modelProperty = tabelaProdutoFornecedorMainService.getModel().tabelaProdutoFornecProduto;

            if(modelProperty.produto) {
                params.idProduto = modelProperty.produto.idProduto;
                return unidadeMedidaProdutoResource.findUnidadeMedidaPorProduto(params);
            } else {
                return;
            }
        }

        function saveTabelaProdutoFornecProduto(tabelaProdutoFornecProduto){
            var params = { parentId: getIdTabelaProdutoFornecedor(), id: tabelaProdutoFornecProduto.id };
            return tabelaProdutoFornecProdutoResource.saveOrUpdate(params, tabelaProdutoFornecProduto);
        }

        function editTabelaProdutoFornecProduto(tabelaProdutoFornecProduto) {
            var params = {
              parentId: getIdTabelaProdutoFornecedor(),
              id: tabelaProdutoFornecProduto.id
            };

            return tabelaProdutoFornecProdutoResource.get(params).$promise;
        }

        function getFilterSearchOptions() {
            return [
               new DcSearchConfigOption('Código', 'codigo', true).toJSON(),
               new DcSearchConfigOption('Descrição', 'descricao', true).toJSON()
            ];
        }

        function getFilterSearchOptionsUnidadeMedida() {
            return [
               new DcSearchConfigOption('Sigla', 'sigla', true).toJSON(),
               new DcSearchConfigOption('Descrição', 'descricao', true).toJSON()
            ];
        }

        function setUpListingConfig() {
            var listingConfigObj = new DcGenericListing();

            listingConfigObj.callFnOnStart(true);
            listingConfigObj.pageChangeCallbackFn(findTabelaProdutoFonecProduto);
            listingConfigObj.columnsConfig(getListingColumnsConfig());

            listingConfig = listingConfigObj.toJSON();
        }

        function findTabelaProdutoFonecProduto(params) {
          params = params || {};
          params.parentId = getIdTabelaProdutoFornecedor();

          return tabelaProdutoFornecProdutoResource.getPaginated(params, function (data) {
              listingConfig.data = data;
          });

        }

        function getListingColumnsConfig() {
           return new DcGenericListingColumnsConfig(getListingColumnsConfigData()).toJSON();
        }

        function getListingColumnsConfigData() {
            return [
                new DcGenericListingColumnConfigData('Produto', ['codigoProduto', 'descricaoProduto']).separator(' - ').toJSON(),
                new DcGenericListingColumnConfigData('Un. Medida', 'unidadeMedida').toJSON(),
                new DcGenericListingColumnConfigData('Custo Unitário', 'custoUnitario',  { filter: 'number', exp: '2' }).toJSON(),
                new DcGenericListingColumnConfigData('Cod. Produto Parceiro', 'codigoParceiro').toJSON(),
                new DcGenericListingColumnConfigData('Início da Vigência', 'inicioVigencia', { filter: 'date', exp: 'dd/MM/yyyy' }).toJSON(),
                new DcGenericListingColumnConfigData('Fim da Vigência', 'fimVigencia', { filter: 'date', exp: 'dd/MM/yyyy' }).toJSON()

               ];
        }

        function getIdTabelaProdutoFornecedor() {
            return $stateParams.id;
        }

        function activate() {
            setUpListingConfig();
        }

    }
})();
