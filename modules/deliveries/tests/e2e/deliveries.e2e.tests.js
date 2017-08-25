'use strict';

describe('Deliveries E2E Tests:', function () {
  describe('Test Deliveries page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/deliveries');
      expect(element.all(by.repeater('delivery in deliveries')).count()).toEqual(0);
    });
  });
});
