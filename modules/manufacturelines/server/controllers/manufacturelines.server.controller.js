'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Manufactureline = mongoose.model('Manufactureline'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manufactureline
 */
exports.create = function(req, res) {
  var manufactureline = new Manufactureline(req.body);
  manufactureline.user = req.user;

  manufactureline.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufactureline);
    }
  });
};

/**
 * Show the current Manufactureline
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var manufactureline = req.manufactureline ? req.manufactureline.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  manufactureline.isCurrentUserOwner = req.user && manufactureline.user && manufactureline.user._id.toString() === req.user._id.toString();

  res.jsonp(manufactureline);
};

/**
 * Update a Manufactureline
 */
exports.update = function(req, res) {
  var manufactureline = req.manufactureline;

  manufactureline = _.extend(manufactureline, req.body);

  manufactureline.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufactureline);
    }
  });
};

/**
 * Delete an Manufactureline
 */
exports.delete = function(req, res) {
  var manufactureline = req.manufactureline;

  manufactureline.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufactureline);
    }
  });
};

/**
 * List of Manufacturelines
 */
exports.list = function(req, res) {
  Manufactureline.find().sort('-created').populate('user', 'displayName').exec(function(err, manufacturelines) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturelines);
    }
  });
};

/**
 * Manufactureline middleware
 */
exports.manufacturelineByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manufactureline is invalid'
    });
  }

  Manufactureline.findById(id).populate('user', 'displayName').exec(function (err, manufactureline) {
    if (err) {
      return next(err);
    } else if (!manufactureline) {
      return res.status(404).send({
        message: 'No Manufactureline with that identifier has been found'
      });
    }
    req.manufactureline = manufactureline;
    next();
  });
};
