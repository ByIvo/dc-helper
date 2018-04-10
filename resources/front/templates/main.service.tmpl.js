(function () {
  'use strict';

  angular
    .module('{{fullModule}}')
    .service('{{name}}MainService', {{name}}MainService);

 {{name}}MainService.$inject = [
   '{{name}}Resource'
 ];

  function {{name}}MainService(
    {{name}}Resource
  ) {
    var vm = this;
    var model = {
      main: {}
    };

    vm.getFormConfig = getFormConfig;
    vm.getModel = getModel;

    //// PUBLIC

    function getFormConfig() {
      var formConfig = new DcGenericCrudMainForm();

      formConfig.getFn(find{{capitalized name}});
      formConfig.saveFn(save{{capitalized name}});
      formConfig.propertyIdName('id{{capitalized name}}');
      formConfig.fields(getFormFields());

      return formConfig.toJSON();
    }

    function getModel() {
      return model;
    }

    /// PRIVATE

    function find{{capitalized name}}(id) {
      return {{name}}Resource.get({id: id});
    }

    function save{{capitalized name}}() {
      var payload = model.main;

      if(payload.id) {
        return {{name}}Resource.update({id: payload.id}, payload);
      }

      return {{name}}Resource.save(payload);
    }

    function getFormFields() {
      return [
        //new DcGenericCrudField('text', 'Código', 3, 'codigo').disable(true).toJSON(),
        // new DcGenericCrudField('calculatedField', 'Parceiro', 9, 'parceiro');
        //             .onlyWhenNew(true)
        //             .require(true)
        //             .mainDataToShow(['codigo', 'nome'])
        //             .minSearchLength(0)
        //             .querySearch(findParceiro)
        //             .filterSearchOptions(getFilterSearchOptionsParceiro())
        //             .toJSON(),
        // new DcGenericCrudField('vigencia', null, 4)
        //             .dateFormat('dd/MM/yyyy')
        //             .requireInicio(true).toJSON(),
      ];
    }

  }
})();
