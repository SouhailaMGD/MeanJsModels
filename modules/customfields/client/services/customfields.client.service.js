// Customfields service used to communicate Customfields REST endpoints
(function () {
  'use strict';

  angular
    .module('customfields')
    .factory('CustomfieldsService', CustomfieldsService);

  CustomfieldsService.$inject = ['$resource'];

  function CustomfieldsService($resource) {
    return $resource('api/customfields/:customfieldId', {
      customfieldId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
