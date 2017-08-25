(function () {
  'use strict';

  angular
    .module('manufacturings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manufacturings', {
        abstract: true,
        url: '/manufacturings',
        template: '<ui-view/>'
      })
      .state('manufacturings.list', {
        url: '',
        templateUrl: 'modules/manufacturings/client/views/list-manufacturings.client.view.html',
        controller: 'ManufacturingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Manufacturings List'
        }
      })
      .state('manufacturings.create', {
        url: '/create',
        templateUrl: 'modules/manufacturings/client/views/form-manufacturing.client.view.html',
        controller: 'ManufacturingsController',
        controllerAs: 'vm',
        resolve: {
          manufacturingResolve: newManufacturing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Manufacturings Create'
        }
      })
      .state('manufacturings.edit', {
        url: '/:manufacturingId/edit',
        templateUrl: 'modules/manufacturings/client/views/form-manufacturing.client.view.html',
        controller: 'ManufacturingsController',
        controllerAs: 'vm',
        resolve: {
          manufacturingResolve: getManufacturing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Manufacturing {{ manufacturingResolve.name }}'
        }
      })
      .state('manufacturings.view', {
        url: '/:manufacturingId',
        templateUrl: 'modules/manufacturings/client/views/view-manufacturing.client.view.html',
        controller: 'ManufacturingsController',
        controllerAs: 'vm',
        resolve: {
          manufacturingResolve: getManufacturing
        },
        data: {
          pageTitle: 'Manufacturing {{ manufacturingResolve.name }}'
        }
      });
  }

  getManufacturing.$inject = ['$stateParams', 'ManufacturingsService'];

  function getManufacturing($stateParams, ManufacturingsService) {
    return ManufacturingsService.get({
      manufacturingId: $stateParams.manufacturingId
    }).$promise;
  }

  newManufacturing.$inject = ['ManufacturingsService'];

  function newManufacturing(ManufacturingsService) {
    return new ManufacturingsService();
  }
}());
