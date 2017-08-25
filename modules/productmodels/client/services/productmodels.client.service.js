// Productmodels service used to communicate Productmodels REST endpoints
(function () {
  'use strict';

  angular
    .module('productmodels')
    .factory('ProductmodelsService', ProductmodelsService);

  ProductmodelsService.$inject = ['$resource'];

  function ProductmodelsService($resource) {
    return $resource('api/productmodels/:productmodelId', {
      productmodelId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
