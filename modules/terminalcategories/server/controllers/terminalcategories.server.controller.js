'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Terminalcategory = mongoose.model('Terminalcategory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Terminalcategory
 */
exports.create = function(req, res) {
  var terminalcategory = new Terminalcategory(req.body);
  terminalcategory.user = req.user;

  terminalcategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminalcategory);
    }
  });
};

/**
 * Show the current Terminalcategory
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var terminalcategory = req.terminalcategory ? req.terminalcategory.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  terminalcategory.isCurrentUserOwner = req.user && terminalcategory.user && terminalcategory.user._id.toString() === req.user._id.toString();

  res.jsonp(terminalcategory);
};

/**
 * Update a Terminalcategory
 */
exports.update = function(req, res) {
  var terminalcategory = req.terminalcategory;

  terminalcategory = _.extend(terminalcategory, req.body);

  terminalcategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminalcategory);
    }
  });
};

/**
 * Delete an Terminalcategory
 */
exports.delete = function(req, res) {
  var terminalcategory = req.terminalcategory;

  terminalcategory.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminalcategory);
    }
  });
};

/**
 * List of Terminalcategories
 */
exports.list = function(req, res) {
  Terminalcategory.find().sort('-created').populate('user', 'displayName').exec(function(err, terminalcategories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(terminalcategories);
    }
  });
};

/**
 * Terminalcategory middleware
 */
exports.terminalcategoryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Terminalcategory is invalid'
    });
  }

  Terminalcategory.findById(id).populate('user', 'displayName').exec(function (err, terminalcategory) {
    if (err) {
      return next(err);
    } else if (!terminalcategory) {
      return res.status(404).send({
        message: 'No Terminalcategory with that identifier has been found'
      });
    }
    req.terminalcategory = terminalcategory;
    next();
  });
};
