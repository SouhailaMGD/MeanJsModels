'use strict';

describe('Manufacturelinetypes E2E Tests:', function () {
  describe('Test Manufacturelinetypes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manufacturelinetypes');
      expect(element.all(by.repeater('manufacturelinetype in manufacturelinetypes')).count()).toEqual(0);
    });
  });
});
