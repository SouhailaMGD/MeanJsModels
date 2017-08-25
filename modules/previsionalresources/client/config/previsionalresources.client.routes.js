(function () {
  'use strict';

  angular
    .module('previsionalresources')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('previsionalresources', {
        abstract: true,
        url: '/previsionalresources',
        template: '<ui-view/>'
      })
      .state('previsionalresources.list', {
        url: '',
        templateUrl: 'modules/previsionalresources/client/views/list-previsionalresources.client.view.html',
        controller: 'PrevisionalresourcesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Previsionalresources List'
        }
      })
      .state('previsionalresources.create', {
        url: '/create',
        templateUrl: 'modules/previsionalresources/client/views/form-previsionalresource.client.view.html',
        controller: 'PrevisionalresourcesController',
        controllerAs: 'vm',
        resolve: {
          previsionalresourceResolve: newPrevisionalresource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Previsionalresources Create'
        }
      })
      .state('previsionalresources.edit', {
        url: '/:previsionalresourceId/edit',
        templateUrl: 'modules/previsionalresources/client/views/form-previsionalresource.client.view.html',
        controller: 'PrevisionalresourcesController',
        controllerAs: 'vm',
        resolve: {
          previsionalresourceResolve: getPrevisionalresource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Previsionalresource {{ previsionalresourceResolve.name }}'
        }
      })
      .state('previsionalresources.view', {
        url: '/:previsionalresourceId',
        templateUrl: 'modules/previsionalresources/client/views/view-previsionalresource.client.view.html',
        controller: 'PrevisionalresourcesController',
        controllerAs: 'vm',
        resolve: {
          previsionalresourceResolve: getPrevisionalresource
        },
        data: {
          pageTitle: 'Previsionalresource {{ previsionalresourceResolve.name }}'
        }
      });
  }

  getPrevisionalresource.$inject = ['$stateParams', 'PrevisionalresourcesService'];

  function getPrevisionalresource($stateParams, PrevisionalresourcesService) {
    return PrevisionalresourcesService.get({
      previsionalresourceId: $stateParams.previsionalresourceId
    }).$promise;
  }

  newPrevisionalresource.$inject = ['PrevisionalresourcesService'];

  function newPrevisionalresource(PrevisionalresourcesService) {
    return new PrevisionalresourcesService();
  }
}());
