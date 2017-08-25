(function () {
  'use strict';

  // Rawmaterials controller
  angular
    .module('rawmaterials')
    .controller('RawmaterialsController', RawmaterialsController);

  RawmaterialsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rawmaterialResolve'];

  function RawmaterialsController ($scope, $state, $window, Authentication, rawmaterial) {
    var vm = this;

    vm.authentication = Authentication;
    vm.rawmaterial = rawmaterial;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Rawmaterial
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.rawmaterial.$remove($state.go('rawmaterials.list'));
      }
    }

    // Save Rawmaterial
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rawmaterialForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.rawmaterial._id) {
        vm.rawmaterial.$update(successCallback, errorCallback);
      } else {
        vm.rawmaterial.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('rawmaterials.view', {
          rawmaterialId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
