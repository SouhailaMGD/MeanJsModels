'use strict';

describe('Productcategories E2E Tests:', function () {
  describe('Test Productcategories page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/productcategories');
      expect(element.all(by.repeater('productcategory in productcategories')).count()).toEqual(0);
    });
  });
});
