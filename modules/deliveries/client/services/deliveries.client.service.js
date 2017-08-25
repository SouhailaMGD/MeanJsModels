// Deliveries service used to communicate Deliveries REST endpoints
(function () {
  'use strict';

  angular
    .module('deliveries')
    .factory('DeliveriesService', DeliveriesService);

  DeliveriesService.$inject = ['$resource'];

  function DeliveriesService($resource) {
    return $resource('api/deliveries/:deliveryId', {
      deliveryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
