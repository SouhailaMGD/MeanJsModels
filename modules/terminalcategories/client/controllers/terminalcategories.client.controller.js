(function () {
  'use strict';

  // Terminalcategories controller
  angular
    .module('terminalcategories')
    .controller('TerminalcategoriesController', TerminalcategoriesController);

  TerminalcategoriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'terminalcategoryResolve'];

  function TerminalcategoriesController ($scope, $state, $window, Authentication, terminalcategory) {
    var vm = this;

    vm.authentication = Authentication;
    vm.terminalcategory = terminalcategory;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Terminalcategory
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.terminalcategory.$remove($state.go('terminalcategories.list'));
      }
    }

    // Save Terminalcategory
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.terminalcategoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.terminalcategory._id) {
        vm.terminalcategory.$update(successCallback, errorCallback);
      } else {
        vm.terminalcategory.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('terminalcategories.view', {
          terminalcategoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
