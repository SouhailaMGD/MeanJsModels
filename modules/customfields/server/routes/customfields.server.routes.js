'use strict';

/**
 * Module dependencies
 */
var customfieldsPolicy = require('../policies/customfields.server.policy'),
  customfields = require('../controllers/customfields.server.controller');

module.exports = function(app) {
  // Customfields Routes
  app.route('/api/customfields').all(customfieldsPolicy.isAllowed)
    .get(customfields.list)
    .post(customfields.create);

  app.route('/api/customfields/:customfieldId').all(customfieldsPolicy.isAllowed)
    .get(customfields.read)
    .put(customfields.update)
    .delete(customfields.delete);

  // Finish by binding the Customfield middleware
  app.param('customfieldId', customfields.customfieldByID);
};
