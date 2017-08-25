'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Delivery = mongoose.model('Delivery'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Delivery
 */
exports.create = function(req, res) {
  var delivery = new Delivery(req.body);
  delivery.user = req.user;

  delivery.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(delivery);
    }
  });
};

/**
 * Show the current Delivery
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var delivery = req.delivery ? req.delivery.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  delivery.isCurrentUserOwner = req.user && delivery.user && delivery.user._id.toString() === req.user._id.toString();

  res.jsonp(delivery);
};

/**
 * Update a Delivery
 */
exports.update = function(req, res) {
  var delivery = req.delivery;

  delivery = _.extend(delivery, req.body);

  delivery.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(delivery);
    }
  });
};

/**
 * Delete an Delivery
 */
exports.delete = function(req, res) {
  var delivery = req.delivery;

  delivery.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(delivery);
    }
  });
};

/**
 * List of Deliveries
 */
exports.list = function(req, res) {
  Delivery.find().sort('-created').populate('user', 'displayName').exec(function(err, deliveries) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveries);
    }
  });
};

/**
 * Delivery middleware
 */
exports.deliveryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Delivery is invalid'
    });
  }

  Delivery.findById(id).populate('user', 'displayName').exec(function (err, delivery) {
    if (err) {
      return next(err);
    } else if (!delivery) {
      return res.status(404).send({
        message: 'No Delivery with that identifier has been found'
      });
    }
    req.delivery = delivery;
    next();
  });
};
