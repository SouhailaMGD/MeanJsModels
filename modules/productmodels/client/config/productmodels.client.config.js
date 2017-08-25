(function () {
  'use strict';

  angular
    .module('productmodels')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Productmodels',
      state: 'productmodels',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'productmodels', {
      title: 'List Productmodels',
      state: 'productmodels.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'productmodels', {
      title: 'Create Productmodel',
      state: 'productmodels.create',
      roles: ['user']
    });
  }
}());
