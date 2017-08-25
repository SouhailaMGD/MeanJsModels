(function () {
  'use strict';

  angular
    .module('terminals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('terminals', {
        abstract: true,
        url: '/terminals',
        template: '<ui-view/>'
      })
      .state('terminals.list', {
        url: '',
        templateUrl: 'modules/terminals/client/views/list-terminals.client.view.html',
        controller: 'TerminalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Terminals List'
        }
      })
      .state('terminals.create', {
        url: '/create',
        templateUrl: 'modules/terminals/client/views/form-terminal.client.view.html',
        controller: 'TerminalsController',
        controllerAs: 'vm',
        resolve: {
          terminalResolve: newTerminal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Terminals Create'
        }
      })
      .state('terminals.edit', {
        url: '/:terminalId/edit',
        templateUrl: 'modules/terminals/client/views/form-terminal.client.view.html',
        controller: 'TerminalsController',
        controllerAs: 'vm',
        resolve: {
          terminalResolve: getTerminal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Terminal {{ terminalResolve.name }}'
        }
      })
      .state('terminals.view', {
        url: '/:terminalId',
        templateUrl: 'modules/terminals/client/views/view-terminal.client.view.html',
        controller: 'TerminalsController',
        controllerAs: 'vm',
        resolve: {
          terminalResolve: getTerminal
        },
        data: {
          pageTitle: 'Terminal {{ terminalResolve.name }}'
        }
      });
  }

  getTerminal.$inject = ['$stateParams', 'TerminalsService'];

  function getTerminal($stateParams, TerminalsService) {
    return TerminalsService.get({
      terminalId: $stateParams.terminalId
    }).$promise;
  }

  newTerminal.$inject = ['TerminalsService'];

  function newTerminal(TerminalsService) {
    return new TerminalsService();
  }
}());
