'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rawmaterialreminder = mongoose.model('Rawmaterialreminder'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rawmaterialreminder
 */
exports.create = function(req, res) {
  var rawmaterialreminder = new Rawmaterialreminder(req.body);
  rawmaterialreminder.user = req.user;

  rawmaterialreminder.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterialreminder);
    }
  });
};

/**
 * Show the current Rawmaterialreminder
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rawmaterialreminder = req.rawmaterialreminder ? req.rawmaterialreminder.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rawmaterialreminder.isCurrentUserOwner = req.user && rawmaterialreminder.user && rawmaterialreminder.user._id.toString() === req.user._id.toString();

  res.jsonp(rawmaterialreminder);
};

/**
 * Update a Rawmaterialreminder
 */
exports.update = function(req, res) {
  var rawmaterialreminder = req.rawmaterialreminder;

  rawmaterialreminder = _.extend(rawmaterialreminder, req.body);

  rawmaterialreminder.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterialreminder);
    }
  });
};

/**
 * Delete an Rawmaterialreminder
 */
exports.delete = function(req, res) {
  var rawmaterialreminder = req.rawmaterialreminder;

  rawmaterialreminder.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterialreminder);
    }
  });
};

/**
 * List of Rawmaterialreminders
 */
exports.list = function(req, res) {
  Rawmaterialreminder.find().sort('-created').populate('user', 'displayName').exec(function(err, rawmaterialreminders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rawmaterialreminders);
    }
  });
};

/**
 * Rawmaterialreminder middleware
 */
exports.rawmaterialreminderByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rawmaterialreminder is invalid'
    });
  }

  Rawmaterialreminder.findById(id).populate('user', 'displayName').exec(function (err, rawmaterialreminder) {
    if (err) {
      return next(err);
    } else if (!rawmaterialreminder) {
      return res.status(404).send({
        message: 'No Rawmaterialreminder with that identifier has been found'
      });
    }
    req.rawmaterialreminder = rawmaterialreminder;
    next();
  });
};
