'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Terminal = mongoose.model('Terminal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Terminal
 */
exports.create = function(req, res) {
  var terminal = new Terminal(req.body);
  terminal.user = req.user;

  terminal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminal);
    }
  });
};

/**
 * Show the current Terminal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var terminal = req.terminal ? req.terminal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  terminal.isCurrentUserOwner = req.user && terminal.user && terminal.user._id.toString() === req.user._id.toString();

  res.jsonp(terminal);
};

/**
 * Update a Terminal
 */
exports.update = function(req, res) {
  var terminal = req.terminal;

  terminal = _.extend(terminal, req.body);

  terminal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminal);
    }
  });
};

/**
 * Delete an Terminal
 */
exports.delete = function(req, res) {
  var terminal = req.terminal;

  terminal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminal);
    }
  });
};

/**
 * List of Terminals
 */
exports.list = function(req, res) {
  Terminal.find().sort('-created').populate('user', 'displayName').exec(function(err, terminals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminals);
    }
  });
};

/**
 * Terminal middleware
 */
exports.terminalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Terminal is invalid'
    });
  }

  Terminal.findById(id).populate('user', 'displayName').exec(function (err, terminal) {
    if (err) {
      return next(err);
    } else if (!terminal) {
      return res.status(404).send({
        message: 'No Terminal with that identifier has been found'
      });
    }
    req.terminal = terminal;
    next();
  });
};
