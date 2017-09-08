'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Delivery Schema
 */
var DeliverySchema = new Schema({
  reference : {
    type: String,
    default: '',
    required: 'Please fill Delivery reference',
    trim: true,

  },
  quantity : {
    type: Number,
    default: '',
    required: 'Please fill Delivery quantity',
    trim: true
  },
  plannedAt : {
    type: String,
    default: '',
    required: 'Please fill Delivery plannedAt',
    trim: true
  },
  deliveredAt : {
    type: String,
    default: '',
    required: 'Please fill Delivery deliveredAt',
    trim: true

  },
  note : {
    type: String,
    default: '',
    trim: true
  },
  state : {
    type: String,
    default: '',
    required: 'Please fill Delivery state',
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

mongoose.model('Delivery', DeliverySchema);
