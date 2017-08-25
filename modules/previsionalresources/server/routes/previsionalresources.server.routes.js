'use strict';

/**
 * Module dependencies
 */
var previsionalresourcesPolicy = require('../policies/previsionalresources.server.policy'),
  previsionalresources = require('../controllers/previsionalresources.server.controller');

module.exports = function(app) {
  // Previsionalresources Routes
  app.route('/api/previsionalresources').all(previsionalresourcesPolicy.isAllowed)
    .get(previsionalresources.list)
    .post(previsionalresources.create);

  app.route('/api/previsionalresources/:previsionalresourceId').all(previsionalresourcesPolicy.isAllowed)
    .get(previsionalresources.read)
    .put(previsionalresources.update)
    .delete(previsionalresources.delete);

  // Finish by binding the Previsionalresource middleware
  app.param('previsionalresourceId', previsionalresources.previsionalresourceByID);
};
