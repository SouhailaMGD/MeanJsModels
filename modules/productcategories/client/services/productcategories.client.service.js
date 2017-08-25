// Productcategories service used to communicate Productcategories REST endpoints
(function () {
  'use strict';

  angular
    .module('productcategories')
    .factory('ProductcategoriesService', ProductcategoriesService);

  ProductcategoriesService.$inject = ['$resource'];

  function ProductcategoriesService($resource) {
    return $resource('api/productcategories/:productcategoryId', {
      productcategoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
