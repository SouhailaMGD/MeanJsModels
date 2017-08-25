// Terminalcategories service used to communicate Terminalcategories REST endpoints
(function () {
  'use strict';

  angular
    .module('terminalcategories')
    .factory('TerminalcategoriesService', TerminalcategoriesService);

  TerminalcategoriesService.$inject = ['$resource'];

  function TerminalcategoriesService($resource) {
    return $resource('api/terminalcategories/:terminalcategoryId', {
      terminalcategoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
