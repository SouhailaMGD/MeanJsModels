(function () {
  'use strict';

  angular
    .module('resources')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Resources',
      state: 'resources',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'resources', {
      title: 'List Resources',
      state: 'resources.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'resources', {
      title: 'Create Resource',
      state: 'resources.create',
      roles: ['user']
    });
  }
}());
