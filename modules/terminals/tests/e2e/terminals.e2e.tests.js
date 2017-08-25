'use strict';

describe('Terminals E2E Tests:', function () {
  describe('Test Terminals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/terminals');
      expect(element.all(by.repeater('terminal in terminals')).count()).toEqual(0);
    });
  });
});
