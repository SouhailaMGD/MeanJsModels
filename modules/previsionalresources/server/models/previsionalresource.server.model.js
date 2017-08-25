'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Previsionalresource Schema
 */
var PrevisionalresourceSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Previsionalresource name',
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

mongoose.model('Previsionalresource', PrevisionalresourceSchema);
