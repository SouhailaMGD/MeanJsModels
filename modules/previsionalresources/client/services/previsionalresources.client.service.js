// Previsionalresources service used to communicate Previsionalresources REST endpoints
(function () {
  'use strict';

  angular
    .module('previsionalresources')
    .factory('PrevisionalresourcesService', PrevisionalresourcesService);

  PrevisionalresourcesService.$inject = ['$resource'];

  function PrevisionalresourcesService($resource) {
    return $resource('api/previsionalresources/:previsionalresourceId', {
      previsionalresourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
