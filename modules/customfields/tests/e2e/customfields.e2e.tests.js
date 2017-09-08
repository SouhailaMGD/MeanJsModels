'use strict';

describe('Customfields E2E Tests:', function () {
  describe('Test Customfields page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/customfields');
      expect(element.all(by.repeater('customfield in customfields')).count()).toEqual(0);
    });
  });
});
