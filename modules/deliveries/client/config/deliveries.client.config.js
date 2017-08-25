(function () {
  'use strict';

  angular
    .module('deliveries')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Deliveries',
      state: 'deliveries',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'deliveries', {
      title: 'List Deliveries',
      state: 'deliveries.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'deliveries', {
      title: 'Create Delivery',
      state: 'deliveries.create',
      roles: ['user']
    });
  }
}());
