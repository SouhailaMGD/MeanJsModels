'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Customfield = mongoose.model('Customfield'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Customfield
 */
exports.create = function(req, res) {
  var customfield = new Customfield(req.body);
  customfield.user = req.user;

  customfield.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(customfield);
    }
  });
};

/**
 * Show the current Customfield
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var customfield = req.customfield ? req.customfield.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  customfield.isCurrentUserOwner = req.user && customfield.user && customfield.user._id.toString() === req.user._id.toString();

  res.jsonp(customfield);
};

/**
 * Update a Customfield
 */
exports.update = function(req, res) {
  var customfield = req.customfield;

  customfield = _.extend(customfield, req.body);

  customfield.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(customfield);
    }
  });
};

/**
 * Delete an Customfield
 */
exports.delete = function(req, res) {
  var customfield = req.customfield;

  customfield.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(customfield);
    }
  });
};

/**
 * List of Customfields
 */
exports.list = function(req, res) {
  Customfield.find().sort('-created').populate('user', 'displayName').exec(function(err, customfields) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(customfields);
    }
  });
};

/**
 * Customfield middleware
 */
exports.customfieldByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Customfield is invalid'
    });
  }

  Customfield.findById(id).populate('user', 'displayName').exec(function (err, customfield) {
    if (err) {
      return next(err);
    } else if (!customfield) {
      return res.status(404).send({
        message: 'No Customfield with that identifier has been found'
      });
    }
    req.customfield = customfield;
    next();
  });
};
