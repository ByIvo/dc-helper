(function () {
  'use strict';

  angular
    .module('cw.faturamento.tabelaProdutoFornecedor')
    .controller('tabelaProdutoFornecedorController', tabelaProdutoFornecedorController);

  tabelaProdutoFornecedorController.$inject = [
    'tabelaProdutoFornecedorResource',
    'tabelaProdutoFornecedorMainService',
    'tabelaProdutoFornecFilialService',
    'tabelaProdutoFornecProdutoService'
  ];

  function tabelaProdutoFornecedorController(
    tabelaProdutoFornecedorResource,
    tabelaProdutoFornecedorMainService,
    tabelaProdutoFornecFilialService,
    tabelaProdutoFornecProdutoService
  ) {
    var vm = this;
    var genericCrudConfig = new DcGenericCrud();

    vm.genericCrudConfig = genericCrudConfig;

    activate();

    ///// PUBLIC

    //// PRIVATE

    function setupGenericCrudConfig() {
      genericCrudConfig.model(tabelaProdutoFornecedorMainService.getModel());
      genericCrudConfig.columnsConfig(getColumnsConfig());
      genericCrudConfig.listingDataFn(findTabelaProdutoFornecedorList);
      genericCrudConfig.formFieldsConfig(getFormFieldsConfig());
      genericCrudConfig.listingFilterOptionsList(getListingFilterOptionsList());
      genericCrudConfig.listingFilterQueryFn(findTabelaProdutoFornecedorList);
      genericCrudConfig.listingDeleteFn(deleteTabelaProdutoFornecedor);

      genericCrudConfig.toJSON();
    }

    function getColumnsConfig() {
      var columnsConfig = new DcGenericListingColumnsConfig();
      columnsConfig.data([
        new DcGenericListingColumnConfigData('Código', 'codigo').toJSON(),
        new DcGenericListingColumnConfigData('Parceiro', ['codigoParceiro', 'nomeParceiro']).separator(' - ').toJSON(),
        new DcGenericListingColumnConfigData('Geral', 'configuracaoGeral').toJSON(),
        new DcGenericListingColumnConfigData('UF Origem', ['siglaUfOrigem', 'descricaoUfOrigem']).separator(' - ').toJSON(),
        new DcGenericListingColumnConfigData('UF Destino', ['siglaUfDestino', 'descricaoUfDestino']).separator(' - ').toJSON(),
        new DcGenericListingColumnConfigData('Início Vigência', 'inicioVigencia', {filter: 'date', exp: 'dd/MM/yyyy'}).toJSON(),
        new DcGenericListingColumnConfigData('Fim Vigência', 'fimVigencia', {filter: 'date', exp: 'dd/MM/yyyy'}).toJSON()
      ]);

      return columnsConfig.toJSON();
    }

    function findTabelaProdutoFornecedorList(params) {
      return tabelaProdutoFornecedorResource.getPaginated(params);
    }

    function getFormFieldsConfig() {
      var formFieldsConfig = new DcGenericCrudFormConfig();

      formFieldsConfig.main(tabelaProdutoFornecedorMainService.getFormConfig());
      formFieldsConfig.tabs(getTabs());

      return formFieldsConfig.toJSON();
    }

    function getTabs() {
      var tabs = new DcTabs();

      tabs.setTab(tabelaProdutoFornecProdutoService.getTabConfig());
      tabs.setTab(tabelaProdutoFornecFilialService.getTabConfig());

      return tabs.toJSON();
    }

    function deleteTabelaProdutoFornecedor(tabelaProdutoFornecedor) {
      return tabelaProdutoFornecedorResource.delete({
        id: tabelaProdutoFornecedor.id
      });
    }

    function getListingFilterOptionsList() {
        return [
          new DcSearchConfigOption('Código', 'codigo', true).toJSON(),
          new DcSearchConfigOption('Código Parceiro', 'codigoParceiro', true).toJSON(),
          new DcSearchConfigOption('Nome Parceiro', 'nomeParceiro', true).toJSON(),
        ];
    }

    function activate() {
      setupGenericCrudConfig();
    }
  }

})();
