(function () {
  'use strict';

  angular
    .module('customfields')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('customfields', {
        abstract: true,
        url: '/customfields',
        template: '<ui-view/>'
      })
      .state('customfields.list', {
        url: '',
        templateUrl: 'modules/customfields/client/views/list-customfields.client.view.html',
        controller: 'CustomfieldsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Customfields List'
        }
      })
      .state('customfields.create', {
        url: '/create',
        templateUrl: 'modules/customfields/client/views/form-customfield.client.view.html',
        controller: 'CustomfieldsController',
        controllerAs: 'vm',
        resolve: {
          customfieldResolve: newCustomfield
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Customfields Create'
        }
      })
      .state('customfields.edit', {
        url: '/:customfieldId/edit',
        templateUrl: 'modules/customfields/client/views/form-customfield.client.view.html',
        controller: 'CustomfieldsController',
        controllerAs: 'vm',
        resolve: {
          customfieldResolve: getCustomfield
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Customfield {{ customfieldResolve.name }}'
        }
      })
      .state('customfields.view', {
        url: '/:customfieldId',
        templateUrl: 'modules/customfields/client/views/view-customfield.client.view.html',
        controller: 'CustomfieldsController',
        controllerAs: 'vm',
        resolve: {
          customfieldResolve: getCustomfield
        },
        data: {
          pageTitle: 'Customfield {{ customfieldResolve.name }}'
        }
      });
  }

  getCustomfield.$inject = ['$stateParams', 'CustomfieldsService'];

  function getCustomfield($stateParams, CustomfieldsService) {
    return CustomfieldsService.get({
      customfieldId: $stateParams.customfieldId
    }).$promise;
  }

  newCustomfield.$inject = ['CustomfieldsService'];

  function newCustomfield(CustomfieldsService) {
    return new CustomfieldsService();
  }
}());
