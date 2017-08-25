'use strict';

/**
 * Module dependencies
 */
var terminalsPolicy = require('../policies/terminals.server.policy'),
  terminals = require('../controllers/terminals.server.controller');

module.exports = function(app) {
  // Terminals Routes
  app.route('/api/terminals').all(terminalsPolicy.isAllowed)
    .get(terminals.list)
    .post(terminals.create);

  app.route('/api/terminals/:terminalId').all(terminalsPolicy.isAllowed)
    .get(terminals.read)
    .put(terminals.update)
    .delete(terminals.delete);

  // Finish by binding the Terminal middleware
  app.param('terminalId', terminals.terminalByID);
};
