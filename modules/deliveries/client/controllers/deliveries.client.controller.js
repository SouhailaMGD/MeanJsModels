(function () {
  'use strict';

  // Deliveries controller
  angular
    .module('deliveries')
    .controller('DeliveriesController', DeliveriesController);

  DeliveriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'deliveryResolve'];

  function DeliveriesController ($scope, $state, $window, Authentication, delivery) {
    var vm = this;

    vm.authentication = Authentication;
    vm.delivery = delivery;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Delivery
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.delivery.$remove($state.go('deliveries.list'));
      }
    }

    // Save Delivery
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deliveryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.delivery._id) {
        vm.delivery.$update(successCallback, errorCallback);
      } else {
        vm.delivery.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('deliveries.view', {
          deliveryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
