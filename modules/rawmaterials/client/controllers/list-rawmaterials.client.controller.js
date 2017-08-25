(function () {
  'use strict';

  angular
    .module('rawmaterials')
    .controller('RawmaterialsListController', RawmaterialsListController);

  RawmaterialsListController.$inject = ['RawmaterialsService'];

  function RawmaterialsListController(RawmaterialsService) {
    var vm = this;

    vm.rawmaterials = RawmaterialsService.query();
  }
}());
