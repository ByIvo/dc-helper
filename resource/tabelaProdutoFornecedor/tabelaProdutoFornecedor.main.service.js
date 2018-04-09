(function () {
  'use strict';

  angular
    .module('cw.faturamento.tabelaProdutoFornecedor')
    .service('tabelaProdutoFornecedorMainService', tabelaProdutoFornecedorMainService);

 tabelaProdutoFornecedorMainService.$inject = [
   'tabelaProdutoFornecedorResource',
   'parceiroResource',
   'unidadeFederativaResource'
 ];

  function tabelaProdutoFornecedorMainService(
    tabelaProdutoFornecedorResource,
    parceiroResource,
    unidadeFederativaResource
  ) {
    var vm = this;
    var model = {
      main: {
        configuracaoGeral: false
      }
    };

    vm.hasFiliais;
    vm.getFormConfig = getFormConfig;
    vm.getModel = getModel;
    vm.isConfiguracaoGeral = isConfiguracaoGeral;
    vm.possuiFiliaisAdicionadas = possuiFiliaisAdicionadas;

    //// PUBLIC

    function getFormConfig() {
      var formConfig = new DcGenericCrudMainForm();

      formConfig.getFn(findTabelaProdutoFornecedor);
      formConfig.saveFn(saveTabelaProdutoFornecedor);
      formConfig.propertyIdName('idTabelaProdutoFornecedor');
      formConfig.fields(getFormFields());

      return formConfig.toJSON();
    }

    function getModel() {
      return model;
    }

    function isConfiguracaoGeral() {
      return getModel().main.configuracaoGeral;
    }

    function possuiFiliaisAdicionadas() {
      return vm.hasFiliais;
    }

    /// PRIVATE

    function findTabelaProdutoFornecedor(id) {
      return tabelaProdutoFornecedorResource.get({id: id});
    }

    function saveTabelaProdutoFornecedor() {
      var payload = model.main;

      if(payload.id) {
        return tabelaProdutoFornecedorResource.update({id: payload.id}, payload);
      }

      return tabelaProdutoFornecedorResource.save(payload);
    }

    function possuiUfInformada(){
        var ufInformada = getModel().main.unidadeFederativaOrigem;
       
        if (!ufInformada){
            ufInformada = getModel().main.unidadeFederativaDestino;
        }

        return ufInformada;
    }

    function getFormFields() {
      return [
        new DcGenericCrudField('text', 'Código', 3, 'codigo').disable(true).toJSON(),
        new DcGenericCrudField('calculatedField', 'Parceiro', 9, 'parceiro')
                    .onlyWhenNew(true)
                    .require(true)
                    .mainDataToShow(['codigo', 'nome'])
                    .minSearchLength(0)
                    .querySearch(findParceiro)
                    .filterSearchOptions(getFilterSearchOptionsParceiro())
                    .toJSON(),
        new DcGenericCrudField('boolean', 'Geral', 2, 'configuracaoGeral').disable(possuiFiliaisAdicionadas).toJSON(),
        new DcGenericCrudField('calculatedField', 'UF Origem', 3, 'unidadeFederativaOrigem')
                    .onlyWhenNew(true)
                    .mainDataToShow(['sigla', 'descricao'])
                    .minSearchLength(0)
                    .querySearch(findUnidadeFederativa)
                    .require(possuiUfInformada)
                    .filterSearchOptions(getFilterSearchOptionsUnidadeFederativa())
                    .toJSON(),
        new DcGenericCrudField('calculatedField', 'UF Destino', 3, 'unidadeFederativaDestino')
                    .onlyWhenNew(true)
                    .mainDataToShow(['sigla', 'descricao'])
                    .minSearchLength(0)
                    .querySearch(findUnidadeFederativa)
                    .require(possuiUfInformada)
                    .filterSearchOptions(getFilterSearchOptionsUnidadeFederativa())
                    .toJSON(),
        new DcGenericCrudField('vigencia', null, 4)
                    .dateFormat('dd/MM/yyyy')
                    .requireInicio(true).toJSON(),
      ];
    }

    function findParceiro(params) {
      return parceiroResource.getItems(params);
    }

    function findUnidadeFederativa(params) {
      return unidadeFederativaResource.getItems(params);
    }

    function getFilterSearchOptionsParceiro() {
      return [
          new DcSearchConfigOption('Código', 'codigo', true).toJSON(),
          new DcSearchConfigOption('Nome', 'nome', true).toJSON()
      ];
    }

    function getFilterSearchOptionsUnidadeFederativa() {
      return [
          new DcSearchConfigOption('Sigla', 'sigla', true).toJSON(),
          new DcSearchConfigOption('Descrição', 'descricao', true).toJSON()
      ];
    }

  }
})();
