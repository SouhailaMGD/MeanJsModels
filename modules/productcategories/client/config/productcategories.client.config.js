(function () {
  'use strict';

  angular
    .module('productcategories')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Productcategories',
      state: 'productcategories',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'productcategories', {
      title: 'List Productcategories',
      state: 'productcategories.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'productcategories', {
      title: 'Create Productcategory',
      state: 'productcategories.create',
      roles: ['user']
    });
  }
}());
