(function () {
  'use strict';

  // Manufacturelinetypes controller
  angular
    .module('manufacturelinetypes')
    .controller('ManufacturelinetypesController', ManufacturelinetypesController);

  ManufacturelinetypesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'manufacturelinetypeResolve'];

  function ManufacturelinetypesController ($scope, $state, $window, Authentication, manufacturelinetype) {
    var vm = this;

    vm.authentication = Authentication;
    vm.manufacturelinetype = manufacturelinetype;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Manufacturelinetype
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.manufacturelinetype.$remove($state.go('manufacturelinetypes.list'));
      }
    }

    // Save Manufacturelinetype
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.manufacturelinetypeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.manufacturelinetype._id) {
        vm.manufacturelinetype.$update(successCallback, errorCallback);
      } else {
        vm.manufacturelinetype.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('manufacturelinetypes.view', {
          manufacturelinetypeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
