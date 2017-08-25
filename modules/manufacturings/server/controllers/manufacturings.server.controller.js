'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Manufacturing = mongoose.model('Manufacturing'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manufacturing
 */
exports.create = function(req, res) {
  var manufacturing = new Manufacturing(req.body);
  manufacturing.user = req.user;

  manufacturing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturing);
    }
  });
};

/**
 * Show the current Manufacturing
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var manufacturing = req.manufacturing ? req.manufacturing.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  manufacturing.isCurrentUserOwner = req.user && manufacturing.user && manufacturing.user._id.toString() === req.user._id.toString();

  res.jsonp(manufacturing);
};

/**
 * Update a Manufacturing
 */
exports.update = function(req, res) {
  var manufacturing = req.manufacturing;

  manufacturing = _.extend(manufacturing, req.body);

  manufacturing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturing);
    }
  });
};

/**
 * Delete an Manufacturing
 */
exports.delete = function(req, res) {
  var manufacturing = req.manufacturing;

  manufacturing.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturing);
    }
  });
};

/**
 * List of Manufacturings
 */
exports.list = function(req, res) {
  Manufacturing.find().sort('-created').populate('user', 'displayName').exec(function(err, manufacturings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manufacturings);
    }
  });
};

/**
 * Manufacturing middleware
 */
exports.manufacturingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manufacturing is invalid'
    });
  }

  Manufacturing.findById(id).populate('user', 'displayName').exec(function (err, manufacturing) {
    if (err) {
      return next(err);
    } else if (!manufacturing) {
      return res.status(404).send({
        message: 'No Manufacturing with that identifier has been found'
      });
    }
    req.manufacturing = manufacturing;
    next();
  });
};
