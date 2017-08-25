(function () {
  'use strict';

  // Productmodels controller
  angular
    .module('productmodels')
    .controller('ProductmodelsController', ProductmodelsController);

  ProductmodelsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productmodelResolve'];

  function ProductmodelsController ($scope, $state, $window, Authentication, productmodel) {
    var vm = this;

    vm.authentication = Authentication;
    vm.productmodel = productmodel;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Productmodel
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.productmodel.$remove($state.go('productmodels.list'));
      }
    }

    // Save Productmodel
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productmodelForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.productmodel._id) {
        vm.productmodel.$update(successCallback, errorCallback);
      } else {
        vm.productmodel.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('productmodels.view', {
          productmodelId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
