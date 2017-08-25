(function () {
  'use strict';

  angular
    .module('rawmaterials')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Rawmaterials',
      state: 'rawmaterials',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'rawmaterials', {
      title: 'List Rawmaterials',
      state: 'rawmaterials.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'rawmaterials', {
      title: 'Create Rawmaterial',
      state: 'rawmaterials.create',
      roles: ['user']
    });
  }
}());
