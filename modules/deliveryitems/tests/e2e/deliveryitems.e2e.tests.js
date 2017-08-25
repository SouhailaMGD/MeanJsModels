'use strict';

describe('Deliveryitems E2E Tests:', function () {
  describe('Test Deliveryitems page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/deliveryitems');
      expect(element.all(by.repeater('deliveryitem in deliveryitems')).count()).toEqual(0);
    });
  });
});
