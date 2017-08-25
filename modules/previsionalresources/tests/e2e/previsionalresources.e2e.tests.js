'use strict';

describe('Previsionalresources E2E Tests:', function () {
  describe('Test Previsionalresources page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/previsionalresources');
      expect(element.all(by.repeater('previsionalresource in previsionalresources')).count()).toEqual(0);
    });
  });
});
