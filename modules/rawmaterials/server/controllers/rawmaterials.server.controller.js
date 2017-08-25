'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rawmaterial = mongoose.model('Rawmaterial'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rawmaterial
 */
exports.create = function(req, res) {
  var rawmaterial = new Rawmaterial(req.body);
  rawmaterial.user = req.user;

  rawmaterial.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterial);
    }
  });
};

/**
 * Show the current Rawmaterial
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rawmaterial = req.rawmaterial ? req.rawmaterial.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rawmaterial.isCurrentUserOwner = req.user && rawmaterial.user && rawmaterial.user._id.toString() === req.user._id.toString();

  res.jsonp(rawmaterial);
};

/**
 * Update a Rawmaterial
 */
exports.update = function(req, res) {
  var rawmaterial = req.rawmaterial;

  rawmaterial = _.extend(rawmaterial, req.body);

  rawmaterial.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterial);
    }
  });
};

/**
 * Delete an Rawmaterial
 */
exports.delete = function(req, res) {
  var rawmaterial = req.rawmaterial;

  rawmaterial.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterial);
    }
  });
};

/**
 * List of Rawmaterials
 */
exports.list = function(req, res) {
  Rawmaterial.find().sort('-created').populate('user', 'displayName').exec(function(err, rawmaterials) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterials);
    }
  });
};

/**
 * Rawmaterial middleware
 */
exports.rawmaterialByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rawmaterial is invalid'
    });
  }

  Rawmaterial.findById(id).populate('user', 'displayName').exec(function (err, rawmaterial) {
    if (err) {
      return next(err);
    } else if (!rawmaterial) {
      return res.status(404).send({
        message: 'No Rawmaterial with that identifier has been found'
      });
    }
    req.rawmaterial = rawmaterial;
    next();
  });
};
