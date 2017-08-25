(function () {
  'use strict';

  angular
    .module('productmodels')
    .controller('ProductmodelsListController', ProductmodelsListController);

  ProductmodelsListController.$inject = ['ProductmodelsService'];

  function ProductmodelsListController(ProductmodelsService) {
    var vm = this;

    vm.productmodels = ProductmodelsService.query();
  }
}());
