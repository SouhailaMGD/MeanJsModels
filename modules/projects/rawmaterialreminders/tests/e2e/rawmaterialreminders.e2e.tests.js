'use strict';

describe('Rawmaterialreminders E2E Tests:', function () {
  describe('Test Rawmaterialreminders page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/rawmaterialreminders');
      expect(element.all(by.repeater('rawmaterialreminder in rawmaterialreminders')).count()).toEqual(0);
    });
  });
});
