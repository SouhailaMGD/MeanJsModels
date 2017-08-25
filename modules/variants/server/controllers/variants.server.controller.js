'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Variant = mongoose.model('Variant'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Variant
 */
exports.create = function(req, res) {
  var variant = new Variant(req.body);
  variant.user = req.user;

  variant.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(variant);
    }
  });
};

/**
 * Show the current Variant
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var variant = req.variant ? req.variant.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  variant.isCurrentUserOwner = req.user && variant.user && variant.user._id.toString() === req.user._id.toString();

  res.jsonp(variant);
};

/**
 * Update a Variant
 */
exports.update = function(req, res) {
  var variant = req.variant;

  variant = _.extend(variant, req.body);

  variant.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(variant);
    }
  });
};

/**
 * Delete an Variant
 */
exports.delete = function(req, res) {
  var variant = req.variant;

  variant.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(variant);
    }
  });
};

/**
 * List of Variants
 */
exports.list = function(req, res) {
  Variant.find().sort('-created').populate('user', 'displayName').exec(function(err, variants) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(variants);
    }
  });
};

/**
 * Variant middleware
 */
exports.variantByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Variant is invalid'
    });
  }

  Variant.findById(id).populate('user', 'displayName').exec(function (err, variant) {
    if (err) {
      return next(err);
    } else if (!variant) {
      return res.status(404).send({
        message: 'No Variant with that identifier has been found'
      });
    }
    req.variant = variant;
    next();
  });
};
