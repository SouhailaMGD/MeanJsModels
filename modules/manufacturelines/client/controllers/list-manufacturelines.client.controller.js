(function () {
  'use strict';

  angular
    .module('manufacturelines')
    .controller('ManufacturelinesListController', ManufacturelinesListController);

  ManufacturelinesListController.$inject = ['ManufacturelinesService'];

  function ManufacturelinesListController(ManufacturelinesService) {
    var vm = this;

    vm.manufacturelines = ManufacturelinesService.query();
  }
}());
