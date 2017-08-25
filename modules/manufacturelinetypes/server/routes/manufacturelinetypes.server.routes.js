'use strict';

/**
 * Module dependencies
 */
var manufacturelinetypesPolicy = require('../policies/manufacturelinetypes.server.policy'),
  manufacturelinetypes = require('../controllers/manufacturelinetypes.server.controller');

module.exports = function(app) {
  // Manufacturelinetypes Routes
  app.route('/api/manufacturelinetypes').all(manufacturelinetypesPolicy.isAllowed)
    .get(manufacturelinetypes.list)
    .post(manufacturelinetypes.create);

  app.route('/api/manufacturelinetypes/:manufacturelinetypeId').all(manufacturelinetypesPolicy.isAllowed)
    .get(manufacturelinetypes.read)
    .put(manufacturelinetypes.update)
    .delete(manufacturelinetypes.delete);

  // Finish by binding the Manufacturelinetype middleware
  app.param('manufacturelinetypeId', manufacturelinetypes.manufacturelinetypeByID);
};
