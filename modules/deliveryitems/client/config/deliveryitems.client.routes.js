(function () {
  'use strict';

  angular
    .module('deliveryitems')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('deliveryitems', {
        abstract: true,
        url: '/deliveryitems',
        template: '<ui-view/>'
      })
      .state('deliveryitems.list', {
        url: '',
        templateUrl: 'modules/deliveryitems/client/views/list-deliveryitems.client.view.html',
        controller: 'DeliveryitemsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deliveryitems List'
        }
      })
      .state('deliveryitems.create', {
        url: '/create',
        templateUrl: 'modules/deliveryitems/client/views/form-deliveryitem.client.view.html',
        controller: 'DeliveryitemsController',
        controllerAs: 'vm',
        resolve: {
          deliveryitemResolve: newDeliveryitem
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Deliveryitems Create'
        }
      })
      .state('deliveryitems.edit', {
        url: '/:deliveryitemId/edit',
        templateUrl: 'modules/deliveryitems/client/views/form-deliveryitem.client.view.html',
        controller: 'DeliveryitemsController',
        controllerAs: 'vm',
        resolve: {
          deliveryitemResolve: getDeliveryitem
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Deliveryitem {{ deliveryitemResolve.name }}'
        }
      })
      .state('deliveryitems.view', {
        url: '/:deliveryitemId',
        templateUrl: 'modules/deliveryitems/client/views/view-deliveryitem.client.view.html',
        controller: 'DeliveryitemsController',
        controllerAs: 'vm',
        resolve: {
          deliveryitemResolve: getDeliveryitem
        },
        data: {
          pageTitle: 'Deliveryitem {{ deliveryitemResolve.name }}'
        }
      });
  }

  getDeliveryitem.$inject = ['$stateParams', 'DeliveryitemsService'];

  function getDeliveryitem($stateParams, DeliveryitemsService) {
    return DeliveryitemsService.get({
      deliveryitemId: $stateParams.deliveryitemId
    }).$promise;
  }

  newDeliveryitem.$inject = ['DeliveryitemsService'];

  function newDeliveryitem(DeliveryitemsService) {
    return new DeliveryitemsService();
  }
}());
