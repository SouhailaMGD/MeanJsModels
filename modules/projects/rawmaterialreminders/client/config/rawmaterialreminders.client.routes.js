(function () {
  'use strict';

  angular
    .module('rawmaterialreminders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rawmaterialreminders', {
        abstract: true,
        url: '/rawmaterialreminders',
        template: '<ui-view/>'
      })
      .state('rawmaterialreminders.list', {
        url: '',
        templateUrl: 'modules/rawmaterialreminders/client/views/list-rawmaterialreminders.client.view.html',
        controller: 'RawmaterialremindersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rawmaterialreminders List'
        }
      })
      .state('rawmaterialreminders.create', {
        url: '/create',
        templateUrl: 'modules/rawmaterialreminders/client/views/form-rawmaterialreminder.client.view.html',
        controller: 'RawmaterialremindersController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialreminderResolve: newRawmaterialreminder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Rawmaterialreminders Create'
        }
      })
      .state('rawmaterialreminders.edit', {
        url: '/:rawmaterialreminderId/edit',
        templateUrl: 'modules/rawmaterialreminders/client/views/form-rawmaterialreminder.client.view.html',
        controller: 'RawmaterialremindersController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialreminderResolve: getRawmaterialreminder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Rawmaterialreminder {{ rawmaterialreminderResolve.name }}'
        }
      })
      .state('rawmaterialreminders.view', {
        url: '/:rawmaterialreminderId',
        templateUrl: 'modules/rawmaterialreminders/client/views/view-rawmaterialreminder.client.view.html',
        controller: 'RawmaterialremindersController',
        controllerAs: 'vm',
        resolve: {
          rawmaterialreminderResolve: getRawmaterialreminder
        },
        data: {
          pageTitle: 'Rawmaterialreminder {{ rawmaterialreminderResolve.name }}'
        }
      });
  }

  getRawmaterialreminder.$inject = ['$stateParams', 'RawmaterialremindersService'];

  function getRawmaterialreminder($stateParams, RawmaterialremindersService) {
    return RawmaterialremindersService.get({
      rawmaterialreminderId: $stateParams.rawmaterialreminderId
    }).$promise;
  }

  newRawmaterialreminder.$inject = ['RawmaterialremindersService'];

  function newRawmaterialreminder(RawmaterialremindersService) {
    return new RawmaterialremindersService();
  }
}());
