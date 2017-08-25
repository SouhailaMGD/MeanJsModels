(function () {
  'use strict';

  angular
    .module('deliveryitems')
    .controller('DeliveryitemsListController', DeliveryitemsListController);

  DeliveryitemsListController.$inject = ['DeliveryitemsService'];

  function DeliveryitemsListController(DeliveryitemsService) {
    var vm = this;

    vm.deliveryitems = DeliveryitemsService.query();
  }
}());
