'use strict';

/**
 * Module dependencies
 */
var manufacturelinesPolicy = require('../policies/manufacturelines.server.policy'),
  manufacturelines = require('../controllers/manufacturelines.server.controller');

module.exports = function(app) {
  // Manufacturelines Routes
  app.route('/api/manufacturelines').all(manufacturelinesPolicy.isAllowed)
    .get(manufacturelines.list)
    .post(manufacturelines.create);

  app.route('/api/manufacturelines/:manufacturelineId').all(manufacturelinesPolicy.isAllowed)
    .get(manufacturelines.read)
    .put(manufacturelines.update)
    .delete(manufacturelines.delete);

  // Finish by binding the Manufactureline middleware
  app.param('manufacturelineId', manufacturelines.manufacturelineByID);
};
