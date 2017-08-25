(function () {
  'use strict';

  // Productcategories controller
  angular
    .module('productcategories')
    .controller('ProductcategoriesController', ProductcategoriesController);

  ProductcategoriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productcategoryResolve'];

  function ProductcategoriesController ($scope, $state, $window, Authentication, productcategory) {
    var vm = this;

    vm.authentication = Authentication;
    vm.productcategory = productcategory;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Productcategory
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.productcategory.$remove($state.go('productcategories.list'));
      }
    }

    // Save Productcategory
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productcategoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.productcategory._id) {
        vm.productcategory.$update(successCallback, errorCallback);
      } else {
        vm.productcategory.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('productcategories.view', {
          productcategoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
