(function () {
  'use strict';

  angular
    .module('rawmaterialreminders')
    .controller('RawmaterialremindersListController', RawmaterialremindersListController);

  RawmaterialremindersListController.$inject = ['RawmaterialremindersService'];

  function RawmaterialremindersListController(RawmaterialremindersService) {
    var vm = this;

    vm.rawmaterialreminders = RawmaterialremindersService.query();
  }
}());
