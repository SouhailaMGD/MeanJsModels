'use strict';

/**
 * Module dependencies
 */
var deliveryitemsPolicy = require('../policies/deliveryitems.server.policy'),
  deliveryitems = require('../controllers/deliveryitems.server.controller');

module.exports = function(app) {
  // Deliveryitems Routes
  app.route('/api/deliveryitems').all(deliveryitemsPolicy.isAllowed)
    .get(deliveryitems.list)
    .post(deliveryitems.create);

  app.route('/api/deliveryitems/:deliveryitemId').all(deliveryitemsPolicy.isAllowed)
    .get(deliveryitems.read)
    .put(deliveryitems.update)
    .delete(deliveryitems.delete);

  // Finish by binding the Deliveryitem middleware
  app.param('deliveryitemId', deliveryitems.deliveryitemByID);
};
