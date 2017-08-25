'use strict';

describe('Manufacturelines E2E Tests:', function () {
  describe('Test Manufacturelines page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manufacturelines');
      expect(element.all(by.repeater('manufactureline in manufacturelines')).count()).toEqual(0);
    });
  });
});
