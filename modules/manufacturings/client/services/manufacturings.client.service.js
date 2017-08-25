// Manufacturings service used to communicate Manufacturings REST endpoints
(function () {
  'use strict';

  angular
    .module('manufacturings')
    .factory('ManufacturingsService', ManufacturingsService);

  ManufacturingsService.$inject = ['$resource'];

  function ManufacturingsService($resource) {
    return $resource('api/manufacturings/:manufacturingId', {
      manufacturingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
