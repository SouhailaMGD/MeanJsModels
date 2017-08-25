(function () {
  'use strict';

  // Manufacturings controller
  angular
    .module('manufacturings')
    .controller('ManufacturingsController', ManufacturingsController);

  ManufacturingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'manufacturingResolve'];

  function ManufacturingsController ($scope, $state, $window, Authentication, manufacturing) {
    var vm = this;

    vm.authentication = Authentication;
    vm.manufacturing = manufacturing;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Manufacturing
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.manufacturing.$remove($state.go('manufacturings.list'));
      }
    }

    // Save Manufacturing
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.manufacturingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.manufacturing._id) {
        vm.manufacturing.$update(successCallback, errorCallback);
      } else {
        vm.manufacturing.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('manufacturings.view', {
          manufacturingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
