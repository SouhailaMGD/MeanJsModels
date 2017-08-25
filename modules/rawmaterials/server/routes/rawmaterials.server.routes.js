'use strict';

/**
 * Module dependencies
 */
var rawmaterialsPolicy = require('../policies/rawmaterials.server.policy'),
  rawmaterials = require('../controllers/rawmaterials.server.controller');

module.exports = function(app) {
  // Rawmaterials Routes
  app.route('/api/rawmaterials').all(rawmaterialsPolicy.isAllowed)
    .get(rawmaterials.list)
    .post(rawmaterials.create);

  app.route('/api/rawmaterials/:rawmaterialId').all(rawmaterialsPolicy.isAllowed)
    .get(rawmaterials.read)
    .put(rawmaterials.update)
    .delete(rawmaterials.delete);

  // Finish by binding the Rawmaterial middleware
  app.param('rawmaterialId', rawmaterials.rawmaterialByID);
};
