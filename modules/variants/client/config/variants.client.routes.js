(function () {
  'use strict';

  angular
    .module('variants')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('variants', {
        abstract: true,
        url: '/variants',
        template: '<ui-view/>'
      })
      .state('variants.list', {
        url: '',
        templateUrl: 'modules/variants/client/views/list-variants.client.view.html',
        controller: 'VariantsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Variants List'
        }
      })
      .state('variants.create', {
        url: '/create',
        templateUrl: 'modules/variants/client/views/form-variant.client.view.html',
        controller: 'VariantsController',
        controllerAs: 'vm',
        resolve: {
          variantResolve: newVariant
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Variants Create'
        }
      })
      .state('variants.edit', {
        url: '/:variantId/edit',
        templateUrl: 'modules/variants/client/views/form-variant.client.view.html',
        controller: 'VariantsController',
        controllerAs: 'vm',
        resolve: {
          variantResolve: getVariant
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Variant {{ variantResolve.name }}'
        }
      })
      .state('variants.view', {
        url: '/:variantId',
        templateUrl: 'modules/variants/client/views/view-variant.client.view.html',
        controller: 'VariantsController',
        controllerAs: 'vm',
        resolve: {
          variantResolve: getVariant
        },
        data: {
          pageTitle: 'Variant {{ variantResolve.name }}'
        }
      });
  }

  getVariant.$inject = ['$stateParams', 'VariantsService'];

  function getVariant($stateParams, VariantsService) {
    return VariantsService.get({
      variantId: $stateParams.variantId
    }).$promise;
  }

  newVariant.$inject = ['VariantsService'];

  function newVariant(VariantsService) {
    return new VariantsService();
  }
}());
