(function () {
  'use strict';

  angular
    .module('terminals')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Terminals',
      state: 'terminals',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'terminals', {
      title: 'List Terminals',
      state: 'terminals.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'terminals', {
      title: 'Create Terminal',
      state: 'terminals.create',
      roles: ['user']
    });
  }
}());
