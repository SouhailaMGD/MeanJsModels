(function () {
  'use strict';

  angular
    .module('previsionalresources')
    .controller('PrevisionalresourcesListController', PrevisionalresourcesListController);

  PrevisionalresourcesListController.$inject = ['PrevisionalresourcesService'];

  function PrevisionalresourcesListController(PrevisionalresourcesService) {
    var vm = this;

    vm.previsionalresources = PrevisionalresourcesService.query();
  }
}());
