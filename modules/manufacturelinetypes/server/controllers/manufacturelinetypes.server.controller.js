'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Manufacturelinetype = mongoose.model('Manufacturelinetype'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manufacturelinetype
 */
exports.create = function(req, res) {
  var manufacturelinetype = new Manufacturelinetype(req.body);
  manufacturelinetype.user = req.user;

  manufacturelinetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturelinetype);
    }
  });
};

/**
 * Show the current Manufacturelinetype
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var manufacturelinetype = req.manufacturelinetype ? req.manufacturelinetype.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  manufacturelinetype.isCurrentUserOwner = req.user && manufacturelinetype.user && manufacturelinetype.user._id.toString() === req.user._id.toString();

  res.jsonp(manufacturelinetype);
};

/**
 * Update a Manufacturelinetype
 */
exports.update = function(req, res) {
  var manufacturelinetype = req.manufacturelinetype;

  manufacturelinetype = _.extend(manufacturelinetype, req.body);

  manufacturelinetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturelinetype);
    }
  });
};

/**
 * Delete an Manufacturelinetype
 */
exports.delete = function(req, res) {
  var manufacturelinetype = req.manufacturelinetype;

  manufacturelinetype.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturelinetype);
    }
  });
};

/**
 * List of Manufacturelinetypes
 */
exports.list = function(req, res) {
  Manufacturelinetype.find().sort('-created').populate('user', 'displayName').exec(function(err, manufacturelinetypes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturelinetypes);
    }
  });
};

/**
 * Manufacturelinetype middleware
 */
exports.manufacturelinetypeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manufacturelinetype is invalid'
    });
  }

  Manufacturelinetype.findById(id).populate('user', 'displayName').exec(function (err, manufacturelinetype) {
    if (err) {
      return next(err);
    } else if (!manufacturelinetype) {
      return res.status(404).send({
        message: 'No Manufacturelinetype with that identifier has been found'
      });
    }
    req.manufacturelinetype = manufacturelinetype;
    next();
  });
};
