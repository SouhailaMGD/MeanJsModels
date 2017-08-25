'use strict';

/**
 * Module dependencies
 */
var variantsPolicy = require('../policies/variants.server.policy'),
  variants = require('../controllers/variants.server.controller');

module.exports = function(app) {
  // Variants Routes
  app.route('/api/variants').all(variantsPolicy.isAllowed)
    .get(variants.list)
    .post(variants.create);

  app.route('/api/variants/:variantId').all(variantsPolicy.isAllowed)
    .get(variants.read)
    .put(variants.update)
    .delete(variants.delete);

  // Finish by binding the Variant middleware
  app.param('variantId', variants.variantByID);
};
