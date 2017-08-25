'use strict';

/**
 * Module dependencies
 */
var terminalcategoriesPolicy = require('../policies/terminalcategories.server.policy'),
  terminalcategories = require('../controllers/terminalcategories.server.controller');

module.exports = function(app) {
  // Terminalcategories Routes
  app.route('/api/terminalcategories').all(terminalcategoriesPolicy.isAllowed)
    .get(terminalcategories.list)
    .post(terminalcategories.create);

  app.route('/api/terminalcategories/:terminalcategoryId').all(terminalcategoriesPolicy.isAllowed)
    .get(terminalcategories.read)
    .put(terminalcategories.update)
    .delete(terminalcategories.delete);

  // Finish by binding the Terminalcategory middleware
  app.param('terminalcategoryId', terminalcategories.terminalcategoryByID);
};
