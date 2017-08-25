(function () {
  'use strict';

  // Previsionalresources controller
  angular
    .module('previsionalresources')
    .controller('PrevisionalresourcesController', PrevisionalresourcesController);

  PrevisionalresourcesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'previsionalresourceResolve'];

  function PrevisionalresourcesController ($scope, $state, $window, Authentication, previsionalresource) {
    var vm = this;

    vm.authentication = Authentication;
    vm.previsionalresource = previsionalresource;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Previsionalresource
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.previsionalresource.$remove($state.go('previsionalresources.list'));
      }
    }

    // Save Previsionalresource
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.previsionalresourceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.previsionalresource._id) {
        vm.previsionalresource.$update(successCallback, errorCallback);
      } else {
        vm.previsionalresource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('previsionalresources.view', {
          previsionalresourceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
