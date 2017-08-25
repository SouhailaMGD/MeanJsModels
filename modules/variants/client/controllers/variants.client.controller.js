(function () {
  'use strict';

  // Variants controller
  angular
    .module('variants')
    .controller('VariantsController', VariantsController);

  VariantsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'variantResolve'];

  function VariantsController ($scope, $state, $window, Authentication, variant) {
    var vm = this;

    vm.authentication = Authentication;
    vm.variant = variant;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Variant
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.variant.$remove($state.go('variants.list'));
      }
    }

    // Save Variant
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.variantForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.variant._id) {
        vm.variant.$update(successCallback, errorCallback);
      } else {
        vm.variant.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('variants.view', {
          variantId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
