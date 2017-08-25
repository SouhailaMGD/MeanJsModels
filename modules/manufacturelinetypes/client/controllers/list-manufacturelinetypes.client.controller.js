(function () {
  'use strict';

  angular
    .module('manufacturelinetypes')
    .controller('ManufacturelinetypesListController', ManufacturelinetypesListController);

  ManufacturelinetypesListController.$inject = ['ManufacturelinetypesService'];

  function ManufacturelinetypesListController(ManufacturelinetypesService) {
    var vm = this;

    vm.manufacturelinetypes = ManufacturelinetypesService.query();
  }
}());
