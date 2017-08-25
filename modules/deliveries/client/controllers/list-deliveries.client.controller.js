(function () {
  'use strict';

  angular
    .module('deliveries')
    .controller('DeliveriesListController', DeliveriesListController);

  DeliveriesListController.$inject = ['DeliveriesService'];

  function DeliveriesListController(DeliveriesService) {
    var vm = this;

    vm.deliveries = DeliveriesService.query();
  }
}());
