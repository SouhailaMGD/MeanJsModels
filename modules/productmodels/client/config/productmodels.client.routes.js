(function () {
  'use strict';

  angular
    .module('productmodels')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('productmodels', {
        abstract: true,
        url: '/productmodels',
        template: '<ui-view/>'
      })
      .state('productmodels.list', {
        url: '',
        templateUrl: 'modules/productmodels/client/views/list-productmodels.client.view.html',
        controller: 'ProductmodelsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Productmodels List'
        }
      })
      .state('productmodels.create', {
        url: '/create',
        templateUrl: 'modules/productmodels/client/views/form-productmodel.client.view.html',
        controller: 'ProductmodelsController',
        controllerAs: 'vm',
        resolve: {
          productmodelResolve: newProductmodel
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Productmodels Create'
        }
      })
      .state('productmodels.edit', {
        url: '/:productmodelId/edit',
        templateUrl: 'modules/productmodels/client/views/form-productmodel.client.view.html',
        controller: 'ProductmodelsController',
        controllerAs: 'vm',
        resolve: {
          productmodelResolve: getProductmodel
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Productmodel {{ productmodelResolve.name }}'
        }
      })
      .state('productmodels.view', {
        url: '/:productmodelId',
        templateUrl: 'modules/productmodels/client/views/view-productmodel.client.view.html',
        controller: 'ProductmodelsController',
        controllerAs: 'vm',
        resolve: {
          productmodelResolve: getProductmodel
        },
        data: {
          pageTitle: 'Productmodel {{ productmodelResolve.name }}'
        }
      });
  }

  getProductmodel.$inject = ['$stateParams', 'ProductmodelsService'];

  function getProductmodel($stateParams, ProductmodelsService) {
    return ProductmodelsService.get({
      productmodelId: $stateParams.productmodelId
    }).$promise;
  }

  newProductmodel.$inject = ['ProductmodelsService'];

  function newProductmodel(ProductmodelsService) {
    return new ProductmodelsService();
  }
}());
