(function () {
  'use strict';

  angular
    .module('terminals')
    .controller('TerminalsListController', TerminalsListController);

  TerminalsListController.$inject = ['TerminalsService'];

  function TerminalsListController(TerminalsService) {
    var vm = this;

    vm.terminals = TerminalsService.query();
  }
}());
