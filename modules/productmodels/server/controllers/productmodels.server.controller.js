'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Productmodel = mongoose.model('Productmodel'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Productmodel
 */
exports.create = function(req, res) {
  var productmodel = new Productmodel(req.body);
  productmodel.user = req.user;

  productmodel.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productmodel);
    }
  });
};

/**
 * Show the current Productmodel
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var productmodel = req.productmodel ? req.productmodel.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  productmodel.isCurrentUserOwner = req.user && productmodel.user && productmodel.user._id.toString() === req.user._id.toString();

  res.jsonp(productmodel);
};

/**
 * Update a Productmodel
 */
exports.update = function(req, res) {
  var productmodel = req.productmodel;

  productmodel = _.extend(productmodel, req.body);

  productmodel.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productmodel);
    }
  });
};

/**
 * Delete an Productmodel
 */
exports.delete = function(req, res) {
  var productmodel = req.productmodel;

  productmodel.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productmodel);
    }
  });
};

/**
 * List of Productmodels
 */
exports.list = function(req, res) {
  Productmodel.find().sort('-created').populate('user', 'displayName').exec(function(err, productmodels) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productmodels);
    }
  });
};

/**
 * Productmodel middleware
 */
exports.productmodelByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Productmodel is invalid'
    });
  }

  Productmodel.findById(id).populate('user', 'displayName').exec(function (err, productmodel) {
    if (err) {
      return next(err);
    } else if (!productmodel) {
      return res.status(404).send({
        message: 'No Productmodel with that identifier has been found'
      });
    }
    req.productmodel = productmodel;
    next();
  });
};
