(function () {
  'use strict';

  angular
    .module('deliveries')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('deliveries', {
        abstract: true,
        url: '/deliveries',
        template: '<ui-view/>'
      })
      .state('deliveries.list', {
        url: '',
        templateUrl: 'modules/deliveries/client/views/list-deliveries.client.view.html',
        controller: 'DeliveriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deliveries List'
        }
      })
      .state('deliveries.create', {
        url: '/create',
        templateUrl: 'modules/deliveries/client/views/form-delivery.client.view.html',
        controller: 'DeliveriesController',
        controllerAs: 'vm',
        resolve: {
          deliveryResolve: newDelivery
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Deliveries Create'
        }
      })
      .state('deliveries.edit', {
        url: '/:deliveryId/edit',
        templateUrl: 'modules/deliveries/client/views/form-delivery.client.view.html',
        controller: 'DeliveriesController',
        controllerAs: 'vm',
        resolve: {
          deliveryResolve: getDelivery
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Delivery {{ deliveryResolve.name }}'
        }
      })
      .state('deliveries.view', {
        url: '/:deliveryId',
        templateUrl: 'modules/deliveries/client/views/view-delivery.client.view.html',
        controller: 'DeliveriesController',
        controllerAs: 'vm',
        resolve: {
          deliveryResolve: getDelivery
        },
        data: {
          pageTitle: 'Delivery {{ deliveryResolve.name }}'
        }
      });
  }

  getDelivery.$inject = ['$stateParams', 'DeliveriesService'];

  function getDelivery($stateParams, DeliveriesService) {
    return DeliveriesService.get({
      deliveryId: $stateParams.deliveryId
    }).$promise;
  }

  newDelivery.$inject = ['DeliveriesService'];

  function newDelivery(DeliveriesService) {
    return new DeliveriesService();
  }
}());
