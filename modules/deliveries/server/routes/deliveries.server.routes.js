'use strict';

/**
 * Module dependencies
 */
var deliveriesPolicy = require('../policies/deliveries.server.policy'),
  deliveries = require('../controllers/deliveries.server.controller');

module.exports = function(app) {
  // Deliveries Routes
  app.route('/api/deliveries').all(deliveriesPolicy.isAllowed)
    .get(deliveries.list)
    .post(deliveries.create);

  app.route('/api/deliveries/:deliveryId').all(deliveriesPolicy.isAllowed)
    .get(deliveries.read)
    .put(deliveries.update)
    .delete(deliveries.delete);

  // Finish by binding the Delivery middleware
  app.param('deliveryId', deliveries.deliveryByID);
};
