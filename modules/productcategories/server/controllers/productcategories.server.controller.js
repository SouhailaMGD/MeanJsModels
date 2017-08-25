'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Productcategory = mongoose.model('Productcategory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Productcategory
 */
exports.create = function(req, res) {
  var productcategory = new Productcategory(req.body);
  productcategory.user = req.user;

  productcategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productcategory);
    }
  });
};

/**
 * Show the current Productcategory
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var productcategory = req.productcategory ? req.productcategory.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  productcategory.isCurrentUserOwner = req.user && productcategory.user && productcategory.user._id.toString() === req.user._id.toString();

  res.jsonp(productcategory);
};

/**
 * Update a Productcategory
 */
exports.update = function(req, res) {
  var productcategory = req.productcategory;

  productcategory = _.extend(productcategory, req.body);

  productcategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productcategory);
    }
  });
};

/**
 * Delete an Productcategory
 */
exports.delete = function(req, res) {
  var productcategory = req.productcategory;

  productcategory.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productcategory);
    }
  });
};

/**
 * List of Productcategories
 */
exports.list = function(req, res) {
  Productcategory.find().sort('-created').populate('user', 'displayName').exec(function(err, productcategories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productcategories);
    }
  });
};

/**
 * Productcategory middleware
 */
exports.productcategoryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Productcategory is invalid'
    });
  }

  Productcategory.findById(id).populate('user', 'displayName').exec(function (err, productcategory) {
    if (err) {
      return next(err);
    } else if (!productcategory) {
      return res.status(404).send({
        message: 'No Productcategory with that identifier has been found'
      });
    }
    req.productcategory = productcategory;
    next();
  });
};
