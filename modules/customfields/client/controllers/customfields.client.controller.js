(function () {
  'use strict';

  // Customfields controller
  angular
    .module('customfields')
    .controller('CustomfieldsController', CustomfieldsController);

  CustomfieldsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'customfieldResolve'];

  function CustomfieldsController ($scope, $state, $window, Authentication, customfield) {
    var vm = this;

    vm.authentication = Authentication;
    vm.customfield = customfield;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Customfield
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.customfield.$remove($state.go('customfields.list'));
      }
    }

    // Save Customfield
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.customfieldForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.customfield._id) {
        vm.customfield.$update(successCallback, errorCallback);
      } else {
        vm.customfield.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('customfields.view', {
          customfieldId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
