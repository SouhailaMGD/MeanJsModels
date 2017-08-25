'use strict';

describe('Terminalcategories E2E Tests:', function () {
  describe('Test Terminalcategories page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/terminalcategories');
      expect(element.all(by.repeater('terminalcategory in terminalcategories')).count()).toEqual(0);
    });
  });
});
