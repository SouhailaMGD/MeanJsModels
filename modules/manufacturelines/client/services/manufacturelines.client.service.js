// Manufacturelines service used to communicate Manufacturelines REST endpoints
(function () {
  'use strict';

  angular
    .module('manufacturelines')
    .factory('ManufacturelinesService', ManufacturelinesService);

  ManufacturelinesService.$inject = ['$resource'];

  function ManufacturelinesService($resource) {
    return $resource('api/manufacturelines/:manufacturelineId', {
      manufacturelineId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
