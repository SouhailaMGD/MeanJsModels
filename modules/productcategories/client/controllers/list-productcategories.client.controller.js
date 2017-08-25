(function () {
  'use strict';

  angular
    .module('productcategories')
    .controller('ProductcategoriesListController', ProductcategoriesListController);

  ProductcategoriesListController.$inject = ['ProductcategoriesService'];

  function ProductcategoriesListController(ProductcategoriesService) {
    var vm = this;

    vm.productcategories = ProductcategoriesService.query();
  }
}());
