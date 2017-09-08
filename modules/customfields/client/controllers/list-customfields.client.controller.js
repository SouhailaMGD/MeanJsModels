(function () {
  'use strict';

  angular
    .module('customfields')
    .controller('CustomfieldsListController', CustomfieldsListController);

  CustomfieldsListController.$inject = ['CustomfieldsService'];

  function CustomfieldsListController(CustomfieldsService) {
    var vm = this;

    vm.customfields = CustomfieldsService.query();
  }
}());
