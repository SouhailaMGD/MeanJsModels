(function () {
  'use strict';

  angular
    .module('manufacturelines')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Manufacturelines',
      state: 'manufacturelines',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'manufacturelines', {
      title: 'List Manufacturelines',
      state: 'manufacturelines.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'manufacturelines', {
      title: 'Create Manufactureline',
      state: 'manufacturelines.create',
      roles: ['user']
    });
  }
}());
