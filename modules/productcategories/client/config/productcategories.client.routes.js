(function () {
  'use strict';

  angular
    .module('productcategories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('productcategories', {
        abstract: true,
        url: '/productcategories',
        template: '<ui-view/>'
      })
      .state('productcategories.list', {
        url: '',
        templateUrl: 'modules/productcategories/client/views/list-productcategories.client.view.html',
        controller: 'ProductcategoriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Productcategories List'
        }
      })
      .state('productcategories.create', {
        url: '/create',
        templateUrl: 'modules/productcategories/client/views/form-productcategory.client.view.html',
        controller: 'ProductcategoriesController',
        controllerAs: 'vm',
        resolve: {
          productcategoryResolve: newProductcategory
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Productcategories Create'
        }
      })
      .state('productcategories.edit', {
        url: '/:productcategoryId/edit',
        templateUrl: 'modules/productcategories/client/views/form-productcategory.client.view.html',
        controller: 'ProductcategoriesController',
        controllerAs: 'vm',
        resolve: {
          productcategoryResolve: getProductcategory
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Productcategory {{ productcategoryResolve.name }}'
        }
      })
      .state('productcategories.view', {
        url: '/:productcategoryId',
        templateUrl: 'modules/productcategories/client/views/view-productcategory.client.view.html',
        controller: 'ProductcategoriesController',
        controllerAs: 'vm',
        resolve: {
          productcategoryResolve: getProductcategory
        },
        data: {
          pageTitle: 'Productcategory {{ productcategoryResolve.name }}'
        }
      });
  }

  getProductcategory.$inject = ['$stateParams', 'ProductcategoriesService'];

  function getProductcategory($stateParams, ProductcategoriesService) {
    return ProductcategoriesService.get({
      productcategoryId: $stateParams.productcategoryId
    }).$promise;
  }

  newProductcategory.$inject = ['ProductcategoriesService'];

  function newProductcategory(ProductcategoriesService) {
    return new ProductcategoriesService();
  }
}());
