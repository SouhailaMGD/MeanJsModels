(function () {
  'use strict';

  // Rawmaterialreminders controller
  angular
    .module('rawmaterialreminders')
    .controller('RawmaterialremindersController', RawmaterialremindersController);

  RawmaterialremindersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rawmaterialreminderResolve'];

  function RawmaterialremindersController ($scope, $state, $window, Authentication, rawmaterialreminder) {
    var vm = this;

    vm.authentication = Authentication;
    vm.rawmaterialreminder = rawmaterialreminder;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Rawmaterialreminder
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.rawmaterialreminder.$remove($state.go('rawmaterialreminders.list'));
      }
    }

    // Save Rawmaterialreminder
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rawmaterialreminderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.rawmaterialreminder._id) {
        vm.rawmaterialreminder.$update(successCallback, errorCallback);
      } else {
        vm.rawmaterialreminder.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('rawmaterialreminders.view', {
          rawmaterialreminderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
