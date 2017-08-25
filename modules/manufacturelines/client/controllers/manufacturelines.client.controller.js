(function () {
  'use strict';

  // Manufacturelines controller
  angular
    .module('manufacturelines')
    .controller('ManufacturelinesController', ManufacturelinesController);

  ManufacturelinesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'manufacturelineResolve'];

  function ManufacturelinesController ($scope, $state, $window, Authentication, manufactureline) {
    var vm = this;

    vm.authentication = Authentication;
    vm.manufactureline = manufactureline;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Manufactureline
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.manufactureline.$remove($state.go('manufacturelines.list'));
      }
    }

    // Save Manufactureline
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.manufacturelineForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.manufactureline._id) {
        vm.manufactureline.$update(successCallback, errorCallback);
      } else {
        vm.manufactureline.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('manufacturelines.view', {
          manufacturelineId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
