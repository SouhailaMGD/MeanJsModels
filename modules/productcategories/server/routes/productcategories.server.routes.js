'use strict';

/**
 * Module dependencies
 */
var productcategoriesPolicy = require('../policies/productcategories.server.policy'),
  productcategories = require('../controllers/productcategories.server.controller');

module.exports = function(app) {
  // Productcategories Routes
  app.route('/api/productcategories').all(productcategoriesPolicy.isAllowed)
    .get(productcategories.list)
    .post(productcategories.create);

  app.route('/api/productcategories/:productcategoryId').all(productcategoriesPolicy.isAllowed)
    .get(productcategories.read)
    .put(productcategories.update)
    .delete(productcategories.delete);

  // Finish by binding the Productcategory middleware
  app.param('productcategoryId', productcategories.productcategoryByID);
};
