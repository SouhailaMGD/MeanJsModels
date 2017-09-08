'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Manufacturing Schema
 */
var ManufacturingSchema = new Schema({
   input: {
    type: Number,
    default: '',
    required: 'Please fill Manufacturing input',
    trim: true
  },
   output: {
    type: Number,
    default: '',
    required: 'Please fill Manufacturing output',
    trim: true
  },
   savedAt: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing savedAt',
    trim: true

  },
    releasedAt: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing releasedAt',
    trim: true

  },
     state: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing state',
    trim: true
  },
     note: {
    type: String,
    default: '',
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

mongoose.model('Manufacturing', ManufacturingSchema);
