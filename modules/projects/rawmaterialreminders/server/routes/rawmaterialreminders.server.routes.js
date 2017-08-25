'use strict';

/**
 * Module dependencies
 */
var rawmaterialremindersPolicy = require('../policies/rawmaterialreminders.server.policy'),
  rawmaterialreminders = require('../controllers/rawmaterialreminders.server.controller');

module.exports = function(app) {
  // Rawmaterialreminders Routes
  app.route('/api/rawmaterialreminders').all(rawmaterialremindersPolicy.isAllowed)
    .get(rawmaterialreminders.list)
    .post(rawmaterialreminders.create);

  app.route('/api/rawmaterialreminders/:rawmaterialreminderId').all(rawmaterialremindersPolicy.isAllowed)
    .get(rawmaterialreminders.read)
    .put(rawmaterialreminders.update)
    .delete(rawmaterialreminders.delete);

  // Finish by binding the Rawmaterialreminder middleware
  app.param('rawmaterialreminderId', rawmaterialreminders.rawmaterialreminderByID);
};
