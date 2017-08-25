(function () {
  'use strict';

  angular
    .module('variants')
    .controller('VariantsListController', VariantsListController);

  VariantsListController.$inject = ['VariantsService'];

  function VariantsListController(VariantsService) {
    var vm = this;

    vm.variants = VariantsService.query();
  }
}());
