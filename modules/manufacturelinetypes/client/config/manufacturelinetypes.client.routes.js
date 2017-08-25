(function () {
  'use strict';

  angular
    .module('manufacturelinetypes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manufacturelinetypes', {
        abstract: true,
        url: '/manufacturelinetypes',
        template: '<ui-view/>'
      })
      .state('manufacturelinetypes.list', {
        url: '',
        templateUrl: 'modules/manufacturelinetypes/client/views/list-manufacturelinetypes.client.view.html',
        controller: 'ManufacturelinetypesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Manufacturelinetypes List'
        }
      })
      .state('manufacturelinetypes.create', {
        url: '/create',
        templateUrl: 'modules/manufacturelinetypes/client/views/form-manufacturelinetype.client.view.html',
        controller: 'ManufacturelinetypesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelinetypeResolve: newManufacturelinetype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Manufacturelinetypes Create'
        }
      })
      .state('manufacturelinetypes.edit', {
        url: '/:manufacturelinetypeId/edit',
        templateUrl: 'modules/manufacturelinetypes/client/views/form-manufacturelinetype.client.view.html',
        controller: 'ManufacturelinetypesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelinetypeResolve: getManufacturelinetype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Manufacturelinetype {{ manufacturelinetypeResolve.name }}'
        }
      })
      .state('manufacturelinetypes.view', {
        url: '/:manufacturelinetypeId',
        templateUrl: 'modules/manufacturelinetypes/client/views/view-manufacturelinetype.client.view.html',
        controller: 'ManufacturelinetypesController',
        controllerAs: 'vm',
        resolve: {
          manufacturelinetypeResolve: getManufacturelinetype
        },
        data: {
          pageTitle: 'Manufacturelinetype {{ manufacturelinetypeResolve.name }}'
        }
      });
  }

  getManufacturelinetype.$inject = ['$stateParams', 'ManufacturelinetypesService'];

  function getManufacturelinetype($stateParams, ManufacturelinetypesService) {
    return ManufacturelinetypesService.get({
      manufacturelinetypeId: $stateParams.manufacturelinetypeId
    }).$promise;
  }

  newManufacturelinetype.$inject = ['ManufacturelinetypesService'];

  function newManufacturelinetype(ManufacturelinetypesService) {
    return new ManufacturelinetypesService();
  }
}());
