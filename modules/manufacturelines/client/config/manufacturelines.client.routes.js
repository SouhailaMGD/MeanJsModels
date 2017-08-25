(function () {
  'use strict';

  angular
    .module('manufacturelines')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manufacturelines', {
        abstract: true,
        url: '/manufacturelines',
        template: '<ui-view/>'
      })
      .state('manufacturelines.list', {
        url: '',
        templateUrl: 'modules/manufacturelines/client/views/list-manufacturelines.client.view.html',
        controller: 'ManufacturelinesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Manufacturelines List'
        }
      })
      .state('manufacturelines.create', {
        url: '/create',
        templateUrl: 'modules/manufacturelines/client/views/form-manufactureline.client.view.html',
        controller: 'ManufacturelinesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelineResolve: newManufactureline
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Manufacturelines Create'
        }
      })
      .state('manufacturelines.edit', {
        url: '/:manufacturelineId/edit',
        templateUrl: 'modules/manufacturelines/client/views/form-manufactureline.client.view.html',
        controller: 'ManufacturelinesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelineResolve: getManufactureline
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Manufactureline {{ manufacturelineResolve.name }}'
        }
      })
      .state('manufacturelines.view', {
        url: '/:manufacturelineId',
        templateUrl: 'modules/manufacturelines/client/views/view-manufactureline.client.view.html',
        controller: 'ManufacturelinesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelineResolve: getManufactureline
        },
        data: {
          pageTitle: 'Manufactureline {{ manufacturelineResolve.name }}'
        }
      });
  }

  getManufactureline.$inject = ['$stateParams', 'ManufacturelinesService'];

  function getManufactureline($stateParams, ManufacturelinesService) {
    return ManufacturelinesService.get({
      manufacturelineId: $stateParams.manufacturelineId
    }).$promise;
  }

  newManufactureline.$inject = ['ManufacturelinesService'];

  function newManufactureline(ManufacturelinesService) {
    return new ManufacturelinesService();
  }
}());
