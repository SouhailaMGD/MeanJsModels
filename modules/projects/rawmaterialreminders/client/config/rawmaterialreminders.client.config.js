(function () {
  'use strict';

  angular
    .module('rawmaterialreminders')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Rawmaterialreminders',
      state: 'rawmaterialreminders',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'rawmaterialreminders', {
      title: 'List Rawmaterialreminders',
      state: 'rawmaterialreminders.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'rawmaterialreminders', {
      title: 'Create Rawmaterialreminder',
      state: 'rawmaterialreminders.create',
      roles: ['user']
    });
  }
}());
