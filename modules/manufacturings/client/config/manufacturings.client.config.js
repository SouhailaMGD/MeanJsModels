(function () {
  'use strict';

  angular
    .module('manufacturings')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Manufacturings',
      state: 'manufacturings',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'manufacturings', {
      title: 'List Manufacturings',
      state: 'manufacturings.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'manufacturings', {
      title: 'Create Manufacturing',
      state: 'manufacturings.create',
      roles: ['user']
    });
  }
}());
