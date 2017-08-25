// Deliveryitems service used to communicate Deliveryitems REST endpoints
(function () {
  'use strict';

  angular
    .module('deliveryitems')
    .factory('DeliveryitemsService', DeliveryitemsService);

  DeliveryitemsService.$inject = ['$resource'];

  function DeliveryitemsService($resource) {
    return $resource('api/deliveryitems/:deliveryitemId', {
      deliveryitemId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
