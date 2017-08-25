'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rawmaterial Schema
 */
var RawmaterialSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Rawmaterial name',
    trim: true
  },
  reference: {
    type: String,
    default: '',
    required: 'Please fill Rawmaterial reference',
    trim: true
  },
  description: {
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

mongoose.model('Rawmaterial', RawmaterialSchema);
