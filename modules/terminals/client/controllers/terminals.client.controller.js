(function () {
  'use strict';

  // Terminals controller
  angular
    .module('terminals')
    .controller('TerminalsController', TerminalsController);

  TerminalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'terminalResolve'];

  function TerminalsController ($scope, $state, $window, Authentication, terminal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.terminal = terminal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Terminal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.terminal.$remove($state.go('terminals.list'));
      }
    }

    // Save Terminal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.terminalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.terminal._id) {
        vm.terminal.$update(successCallback, errorCallback);
      } else {
        vm.terminal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('terminals.view', {
          terminalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
