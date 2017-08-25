(function () {
  'use strict';

  angular
    .module('deliveryitems')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Deliveryitems',
      state: 'deliveryitems',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'deliveryitems', {
      title: 'List Deliveryitems',
      state: 'deliveryitems.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'deliveryitems', {
      title: 'Create Deliveryitem',
      state: 'deliveryitems.create',
      roles: ['user']
    });
  }
}());
