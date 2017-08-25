(function () {
  'use strict';

  angular
    .module('terminalcategories')
    .controller('TerminalcategoriesListController', TerminalcategoriesListController);

  TerminalcategoriesListController.$inject = ['TerminalcategoriesService'];

  function TerminalcategoriesListController(TerminalcategoriesService) {
    var vm = this;

    vm.terminalcategories = TerminalcategoriesService.query();
  }
}());
