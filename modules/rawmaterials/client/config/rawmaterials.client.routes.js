(function () {
  'use strict';

  angular
    .module('rawmaterials')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rawmaterials', {
        abstract: true,
        url: '/rawmaterials',
        template: '<ui-view/>'
      })
      .state('rawmaterials.list', {
        url: '',
        templateUrl: 'modules/rawmaterials/client/views/list-rawmaterials.client.view.html',
        controller: 'RawmaterialsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rawmaterials List'
        }
      })
      .state('rawmaterials.create', {
        url: '/create',
        templateUrl: 'modules/rawmaterials/client/views/form-rawmaterial.client.view.html',
        controller: 'RawmaterialsController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialResolve: newRawmaterial
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Rawmaterials Create'
        }
      })
      .state('rawmaterials.edit', {
        url: '/:rawmaterialId/edit',
        templateUrl: 'modules/rawmaterials/client/views/form-rawmaterial.client.view.html',
        controller: 'RawmaterialsController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialResolve: getRawmaterial
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Rawmaterial {{ rawmaterialResolve.name }}'
        }
      })
      .state('rawmaterials.view', {
        url: '/:rawmaterialId',
        templateUrl: 'modules/rawmaterials/client/views/view-rawmaterial.client.view.html',
        controller: 'RawmaterialsController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialResolve: getRawmaterial
        },
        data: {
          pageTitle: 'Rawmaterial {{ rawmaterialResolve.name }}'
        }
      });
  }

  getRawmaterial.$inject = ['$stateParams', 'RawmaterialsService'];

  function getRawmaterial($stateParams, RawmaterialsService) {
    return RawmaterialsService.get({
      rawmaterialId: $stateParams.rawmaterialId
    }).$promise;
  }

  newRawmaterial.$inject = ['RawmaterialsService'];

  function newRawmaterial(RawmaterialsService) {
    return new RawmaterialsService();
  }
}());
