// Rawmaterialreminders service used to communicate Rawmaterialreminders REST endpoints
(function () {
  'use strict';

  angular
    .module('rawmaterialreminders')
    .factory('RawmaterialremindersService', RawmaterialremindersService);

  RawmaterialremindersService.$inject = ['$resource'];

  function RawmaterialremindersService($resource) {
    return $resource('api/rawmaterialreminders/:rawmaterialreminderId', {
      rawmaterialreminderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
