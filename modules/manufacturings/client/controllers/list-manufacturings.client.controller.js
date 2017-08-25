(function () {
  'use strict';

  angular
    .module('manufacturings')
    .controller('ManufacturingsListController', ManufacturingsListController);

  ManufacturingsListController.$inject = ['ManufacturingsService'];

  function ManufacturingsListController(ManufacturingsService) {
    var vm = this;

    vm.manufacturings = ManufacturingsService.query();
  }
}());
