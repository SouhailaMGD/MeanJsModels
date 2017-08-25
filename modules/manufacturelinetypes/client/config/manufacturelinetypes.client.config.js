(function () {
  'use strict';

  angular
    .module('manufacturelinetypes')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Manufacturelinetypes',
      state: 'manufacturelinetypes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'manufacturelinetypes', {
      title: 'List Manufacturelinetypes',
      state: 'manufacturelinetypes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'manufacturelinetypes', {
      title: 'Create Manufacturelinetype',
      state: 'manufacturelinetypes.create',
      roles: ['user']
    });
  }
}());
