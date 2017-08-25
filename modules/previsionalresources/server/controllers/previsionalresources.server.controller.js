'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Previsionalresource = mongoose.model('Previsionalresource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Previsionalresource
 */
exports.create = function(req, res) {
  var previsionalresource = new Previsionalresource(req.body);
  previsionalresource.user = req.user;

  previsionalresource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(previsionalresource);
    }
  });
};

/**
 * Show the current Previsionalresource
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var previsionalresource = req.previsionalresource ? req.previsionalresource.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  previsionalresource.isCurrentUserOwner = req.user && previsionalresource.user && previsionalresource.user._id.toString() === req.user._id.toString();

  res.jsonp(previsionalresource);
};

/**
 * Update a Previsionalresource
 */
exports.update = function(req, res) {
  var previsionalresource = req.previsionalresource;

  previsionalresource = _.extend(previsionalresource, req.body);

  previsionalresource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(previsionalresource);
    }
  });
};

/**
 * Delete an Previsionalresource
 */
exports.delete = function(req, res) {
  var previsionalresource = req.previsionalresource;

  previsionalresource.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(previsionalresource);
    }
  });
};

/**
 * List of Previsionalresources
 */
exports.list = function(req, res) {
  Previsionalresource.find().sort('-created').populate('user', 'displayName').exec(function(err, previsionalresources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(previsionalresources);
    }
  });
};

/**
 * Previsionalresource middleware
 */
exports.previsionalresourceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Previsionalresource is invalid'
    });
  }

  Previsionalresource.findById(id).populate('user', 'displayName').exec(function (err, previsionalresource) {
    if (err) {
      return next(err);
    } else if (!previsionalresource) {
      return res.status(404).send({
        message: 'No Previsionalresource with that identifier has been found'
      });
    }
    req.previsionalresource = previsionalresource;
    next();
  });
};
