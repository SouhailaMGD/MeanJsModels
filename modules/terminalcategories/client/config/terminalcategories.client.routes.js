(function () {
  'use strict';

  angular
    .module('terminalcategories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('terminalcategories', {
        abstract: true,
        url: '/terminalcategories',
        template: '<ui-view/>'
      })
      .state('terminalcategories.list', {
        url: '',
        templateUrl: 'modules/terminalcategories/client/views/list-terminalcategories.client.view.html',
        controller: 'TerminalcategoriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Terminalcategories List'
        }
      })
      .state('terminalcategories.create', {
        url: '/create',
        templateUrl: 'modules/terminalcategories/client/views/form-terminalcategory.client.view.html',
        controller: 'TerminalcategoriesController',
        controllerAs: 'vm',
        resolve: {
          terminalcategoryResolve: newTerminalcategory
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Terminalcategories Create'
        }
      })
      .state('terminalcategories.edit', {
        url: '/:terminalcategoryId/edit',
        templateUrl: 'modules/terminalcategories/client/views/form-terminalcategory.client.view.html',
        controller: 'TerminalcategoriesController',
        controllerAs: 'vm',
        resolve: {
          terminalcategoryResolve: getTerminalcategory
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Terminalcategory {{ terminalcategoryResolve.name }}'
        }
      })
      .state('terminalcategories.view', {
        url: '/:terminalcategoryId',
        templateUrl: 'modules/terminalcategories/client/views/view-terminalcategory.client.view.html',
        controller: 'TerminalcategoriesController',
        controllerAs: 'vm',
        resolve: {
          terminalcategoryResolve: getTerminalcategory
        },
        data: {
          pageTitle: 'Terminalcategory {{ terminalcategoryResolve.name }}'
        }
      });
  }

  getTerminalcategory.$inject = ['$stateParams', 'TerminalcategoriesService'];

  function getTerminalcategory($stateParams, TerminalcategoriesService) {
    return TerminalcategoriesService.get({
      terminalcategoryId: $stateParams.terminalcategoryId
    }).$promise;
  }

  newTerminalcategory.$inject = ['TerminalcategoriesService'];

  function newTerminalcategory(TerminalcategoriesService) {
    return new TerminalcategoriesService();
  }
}());
