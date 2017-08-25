(function () {
  'use strict';

  angular
    .module('terminalcategories')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Terminalcategories',
      state: 'terminalcategories',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'terminalcategories', {
      title: 'List Terminalcategories',
      state: 'terminalcategories.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'terminalcategories', {
      title: 'Create Terminalcategory',
      state: 'terminalcategories.create',
      roles: ['user']
    });
  }
}());
