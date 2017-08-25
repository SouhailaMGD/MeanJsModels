'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Deliveryitem = mongoose.model('Deliveryitem'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Deliveryitem
 */
exports.create = function(req, res) {
  var deliveryitem = new Deliveryitem(req.body);
  deliveryitem.user = req.user;

  deliveryitem.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryitem);
    }
  });
};

/**
 * Show the current Deliveryitem
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var deliveryitem = req.deliveryitem ? req.deliveryitem.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  deliveryitem.isCurrentUserOwner = req.user && deliveryitem.user && deliveryitem.user._id.toString() === req.user._id.toString();

  res.jsonp(deliveryitem);
};

/**
 * Update a Deliveryitem
 */
exports.update = function(req, res) {
  var deliveryitem = req.deliveryitem;

  deliveryitem = _.extend(deliveryitem, req.body);

  deliveryitem.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryitem);
    }
  });
};

/**
 * Delete an Deliveryitem
 */
exports.delete = function(req, res) {
  var deliveryitem = req.deliveryitem;

  deliveryitem.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryitem);
    }
  });
};

/**
 * List of Deliveryitems
 */
exports.list = function(req, res) {
  Deliveryitem.find().sort('-created').populate('user', 'displayName').exec(function(err, deliveryitems) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryitems);
    }
  });
};

/**
 * Deliveryitem middleware
 */
exports.deliveryitemByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deliveryitem is invalid'
    });
  }

  Deliveryitem.findById(id).populate('user', 'displayName').exec(function (err, deliveryitem) {
    if (err) {
      return next(err);
    } else if (!deliveryitem) {
      return res.status(404).send({
        message: 'No Deliveryitem with that identifier has been found'
      });
    }
    req.deliveryitem = deliveryitem;
    next();
  });
};
