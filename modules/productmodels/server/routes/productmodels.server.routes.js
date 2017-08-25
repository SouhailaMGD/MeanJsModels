'use strict';

/**
 * Module dependencies
 */
var productmodelsPolicy = require('../policies/productmodels.server.policy'),
  productmodels = require('../controllers/productmodels.server.controller');

module.exports = function(app) {
  // Productmodels Routes
  app.route('/api/productmodels').all(productmodelsPolicy.isAllowed)
    .get(productmodels.list)
    .post(productmodels.create);

  app.route('/api/productmodels/:productmodelId').all(productmodelsPolicy.isAllowed)
    .get(productmodels.read)
    .put(productmodels.update)
    .delete(productmodels.delete);

  // Finish by binding the Productmodel middleware
  app.param('productmodelId', productmodels.productmodelByID);
};
