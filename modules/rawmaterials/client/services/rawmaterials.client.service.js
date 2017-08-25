// Rawmaterials service used to communicate Rawmaterials REST endpoints
(function () {
  'use strict';

  angular
    .module('rawmaterials')
    .factory('RawmaterialsService', RawmaterialsService);

  RawmaterialsService.$inject = ['$resource'];

  function RawmaterialsService($resource) {
    return $resource('api/rawmaterials/:rawmaterialId', {
      rawmaterialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
