(function () {
  'use strict';

  // Deliveryitems controller
  angular
    .module('deliveryitems')
    .controller('DeliveryitemsController', DeliveryitemsController);

  DeliveryitemsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'deliveryitemResolve'];

  function DeliveryitemsController ($scope, $state, $window, Authentication, deliveryitem) {
    var vm = this;

    vm.authentication = Authentication;
    vm.deliveryitem = deliveryitem;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Deliveryitem
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.deliveryitem.$remove($state.go('deliveryitems.list'));
      }
    }

    // Save Deliveryitem
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deliveryitemForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.deliveryitem._id) {
        vm.deliveryitem.$update(successCallback, errorCallback);
      } else {
        vm.deliveryitem.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('deliveryitems.view', {
          deliveryitemId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
