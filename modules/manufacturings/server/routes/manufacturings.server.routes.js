'use strict';

/**
 * Module dependencies
 */
var manufacturingsPolicy = require('../policies/manufacturings.server.policy'),
  manufacturings = require('../controllers/manufacturings.server.controller');

module.exports = function(app) {
  // Manufacturings Routes
  app.route('/api/manufacturings').all(manufacturingsPolicy.isAllowed)
    .get(manufacturings.list)
    .post(manufacturings.create);

  app.route('/api/manufacturings/:manufacturingId').all(manufacturingsPolicy.isAllowed)
    .get(manufacturings.read)
    .put(manufacturings.update)
    .delete(manufacturings.delete);

  // Finish by binding the Manufacturing middleware
  app.param('manufacturingId', manufacturings.manufacturingByID);
};
