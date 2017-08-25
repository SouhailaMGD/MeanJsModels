'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Process Schema
 */
var ProcessSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Process name',
    trim: true,
    match : /^[a-zA-Z0-9]*$/
  },
   state: {
    type: String,
    default: '',
    required: 'Please fill Process name',
    trim: true
  },
   Description: {
    type: String,
    default: '',
    trim: true
  },
   buildingData: {
    type: String,
    default: '',
    trim: true
  },
   buildingImage: {
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

mongoose.model('Process', ProcessSchema);
