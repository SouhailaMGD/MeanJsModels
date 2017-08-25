'use strict';

describe('Rawmaterials E2E Tests:', function () {
  describe('Test Rawmaterials page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/rawmaterials');
      expect(element.all(by.repeater('rawmaterial in rawmaterials')).count()).toEqual(0);
    });
  });
});
