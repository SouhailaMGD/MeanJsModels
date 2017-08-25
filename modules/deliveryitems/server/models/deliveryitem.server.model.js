'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Deliveryitem Schema
 */
var DeliveryitemSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Deliveryitem name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Deliveryitem', DeliveryitemSchema);
