// Variants service used to communicate Variants REST endpoints
(function () {
  'use strict';

  angular
    .module('variants')
    .factory('VariantsService', VariantsService);

  VariantsService.$inject = ['$resource'];

  function VariantsService($resource) {
    return $resource('api/variants/:variantId', {
      variantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
