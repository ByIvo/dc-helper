(function () {
  'use strict';

  angular
    .module('{{fullModule}}')
    .controller('{{name}}Controller', {{name}}Controller);

  {{name}}Controller.$inject = [
    '{{name}}Resource',
    '{{name}}MainService'
  ];

  function {{name}}Controller(
    {{name}}Resource,
    {{name}}MainService
  ) {
    var vm = this;
    var genericCrudConfig = new DcGenericCrud();

    vm.genericCrudConfig = genericCrudConfig;

    activate();

    ///// PUBLIC

    //// PRIVATE

    function setupGenericCrudConfig() {
      genericCrudConfig.model({{name}}MainService.getModel());
      genericCrudConfig.columnsConfig(getColumnsConfig());
      genericCrudConfig.listingDataFn(find{{capitalized name}}List);
      genericCrudConfig.formFieldsConfig(getFormFieldsConfig());
      genericCrudConfig.listingFilterOptionsList(getListingFilterOptionsList());
      genericCrudConfig.listingFilterQueryFn(find{{capitalized name}}List);
      genericCrudConfig.listingDeleteFn(delete{{capitalized name}});

      genericCrudConfig.toJSON();
    }

    function getColumnsConfig() {
      var columnsConfig = new DcGenericListingColumnsConfig();
      columnsConfig.data([
        //new DcGenericListingColumnConfigData('Código', 'codigo').toJSON(),
        //new DcGenericListingColumnConfigData('Parceiro', ['codigoParceiro', 'nomeParceiro']).separator(' - ').toJSON(),
        //new DcGenericListingColumnConfigData('Início Vigência', 'inicioVigencia', {filter: 'date', exp: 'dd/MM/yyyy'}).toJSON(),
      ]);

      return columnsConfig.toJSON();
    }

    function find{{capitalized name}}List(params) {
      return {{name}}Resource.getPaginated(params);
    }

    function getFormFieldsConfig() {
      var formFieldsConfig = new DcGenericCrudFormConfig();

      formFieldsConfig.main({{name}}MainService.getFormConfig());
      formFieldsConfig.tabs(getTabs());

      return formFieldsConfig.toJSON();
    }

    function getTabs() {
      var tabs = new DcTabs();

      //tabs.setTab(TabService.getTabConfig());

      return tabs.toJSON();
    }

    function delete{{capitalized name}}({{name}}) {
      return {{name}}Resource.delete({
        id: {{name}}.id
      });
    }

    function getListingFilterOptionsList() {
        return [
          //new DcSearchConfigOption('Código', 'codigo', true).toJSON()
        ];
    }

    function activate() {
      setupGenericCrudConfig();
    }
  }

})();
