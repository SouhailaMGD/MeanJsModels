'use strict';

describe('Manufacturings E2E Tests:', function () {
  describe('Test Manufacturings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manufacturings');
      expect(element.all(by.repeater('manufacturing in manufacturings')).count()).toEqual(0);
    });
  });
});
