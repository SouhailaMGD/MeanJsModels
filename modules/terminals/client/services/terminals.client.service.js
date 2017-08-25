// Terminals service used to communicate Terminals REST endpoints
(function () {
  'use strict';

  angular
    .module('terminals')
    .factory('TerminalsService', TerminalsService);

  TerminalsService.$inject = ['$resource'];

  function TerminalsService($resource) {
    return $resource('api/terminals/:terminalId', {
      terminalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
