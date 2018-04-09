(function () {
    'use strict';

    angular
        .module('cw.faturamento.tabelaProdutoFornecedor')
        .service('tabelaProdutoFornecFilialService', tabelaProdutoFornecFilialService);

    tabelaProdutoFornecFilialService.$inject = [
        '$stateParams',
        'tabelaProdutoFornecFilialResource',
        'tabelaProdutoFornecedorMainService',
        'genericUtilService'
    ];

    function tabelaProdutoFornecFilialService(
        $stateParams,
        tabelaProdutoFornecFilialResource,
        tabelaProdutoFornecedorMainService,
        genericUtilService
    ) {
        var vm = this;
        var listingConfig;

        vm.getTabConfig = getTabConfig;

        activate();

        function getTabConfig() {
            var tab = new DcGenericCrudTabForm();
            tab.label('Filial');
            tab.isTabDisabled(isTabFiliaisDisabled);
            tab.fields(getFormFields());
            tab.modelProperty('tabelaProdutoFornecFilial');
            tab.listingConfig(listingConfig);
            tab.saveFn(saveTabelaProdutoFornecFilial);
            tab.editRequestFn(editTabelaProdutoFornecFilial);
            tab.deleteFn(deleteTabelaProdutoFornecFilial);

            return tab.toJSON();
        }

        function deleteTabelaProdutoFornecFilial(tabelaProdutoFornecFilial) {

            params = {
                id: tabelaProdutoFornecFilial.id,
                parentId: getIdTabelaProdutoFornecedor()
            }

            return tabelaProdutoFornecFilialResource.delete(params);

        }

        function getFormFields() {
            return [
                new DcGenericCrudField('calculatedField', 'Filial', 6, 'filial')
                    .filterSearchOptions(getFilterSearchOptions())
                    .resourceName('filialResource')
                    .minSearchLength(0)
                    .require(true).toJSON(),
                new DcGenericCrudField('vigencia', null, 6)
                    .dateFormat('dd/MM/yyyy')
                    .requireInicio(true).toJSON()
            ];
        }

        function saveTabelaProdutoFornecFilial(tabelaProdutoFornecFilial) {
            var params = { parentId: getIdTabelaProdutoFornecedor(), id: tabelaProdutoFornecFilial.id };
            return tabelaProdutoFornecFilialResource.saveOrUpdate(params, tabelaProdutoFornecFilial);
        }

        function editTabelaProdutoFornecFilial(tabelaProdutoFornecFilial) {
            var params = {
                parentId: getIdTabelaProdutoFornecedor(),
                id: tabelaProdutoFornecFilial.id
            };

            return tabelaProdutoFornecFilialResource.get(params).$promise;
        }

        function getFilterSearchOptions() {
            return [
                new DcSearchConfigOption('Código', 'codigo', true).toJSON(),
                new DcSearchConfigOption('Descrição', 'descricao', true).toJSON()
            ];
        }

        function setUpListingConfig() {
            var listingConfigObj = new DcGenericListing();
            listingConfigObj.callFnOnStart(true);
            listingConfigObj.pageChangeCallbackFn(findTabelaProdutoFonecFilial);
            listingConfigObj.columnsConfig(getListingColumnsConfig());

            listingConfig = listingConfigObj.toJSON();
        }

        function findTabelaProdutoFonecFilial(params) {
            params = params || {};
            params.parentId = getIdTabelaProdutoFornecedor();

            return tabelaProdutoFornecFilialResource.getPaginated(params, function (data) {
                listingConfig.data = data;
                tabelaProdutoFornecedorMainService.hasFiliais = data.items.length > 0;
            });

        }

        function getListingColumnsConfig() {
            return new DcGenericListingColumnsConfig(getListingColumnsConfigData()).toJSON();
        }

        function getListingColumnsConfigData() {
            return [
                new DcGenericListingColumnConfigData('Filial', ['codigoFilial', 'descricaoFilial']).separator(' - ').toJSON(),
                new DcGenericListingColumnConfigData('Início da Vigência', 'inicioVigencia', { filter: 'date', exp: 'dd/MM/yyyy' }).toJSON(),
                new DcGenericListingColumnConfigData('Fim da Vigência', 'fimVigencia', { filter: 'date', exp: 'dd/MM/yyyy' }).toJSON()
            ];
        }

        function getIdTabelaProdutoFornecedor() {
            return $stateParams.id;
        }

        function isTabFiliaisDisabled() {
            return tabelaProdutoFornecedorMainService.isConfiguracaoGeral() || genericUtilService.isNew();
        }

        function activate() {
            setUpListingConfig();
        }

    }
})();
