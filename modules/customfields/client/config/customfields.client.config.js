(function () {
  'use strict';

  angular
    .module('customfields')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Customfields',
      state: 'customfields',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'customfields', {
      title: 'List Customfields',
      state: 'customfields.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'customfields', {
      title: 'Create Customfield',
      state: 'customfields.create',
      roles: ['user']
    });
  }
}());
