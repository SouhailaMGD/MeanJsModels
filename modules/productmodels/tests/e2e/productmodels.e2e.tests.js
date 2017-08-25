'use strict';

describe('Productmodels E2E Tests:', function () {
  describe('Test Productmodels page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/productmodels');
      expect(element.all(by.repeater('productmodel in productmodels')).count()).toEqual(0);
    });
  });
});
