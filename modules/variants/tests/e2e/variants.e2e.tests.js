'use strict';

describe('Variants E2E Tests:', function () {
  describe('Test Variants page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/variants');
      expect(element.all(by.repeater('variant in variants')).count()).toEqual(0);
    });
  });
});
