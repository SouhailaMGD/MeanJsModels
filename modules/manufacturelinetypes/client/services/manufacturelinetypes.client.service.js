// Manufacturelinetypes service used to communicate Manufacturelinetypes REST endpoints
(function () {
  'use strict';

  angular
    .module('manufacturelinetypes')
    .factory('ManufacturelinetypesService', ManufacturelinetypesService);

  ManufacturelinetypesService.$inject = ['$resource'];

  function ManufacturelinetypesService($resource) {
    return $resource('api/manufacturelinetypes/:manufacturelinetypeId', {
      manufacturelinetypeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
