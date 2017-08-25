'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Manufacturelinetype Schema
 */
var ManufacturelinetypeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Manufacturelinetype name',
    trim: true,
    match : /^[a-zA-Z]*/
  },
   description: {
    type: String,
    default: '',
    trim: true
  },
   minEffective: {
    type: Number,
    default: '',
    required: 'Please fill minEffective name',
    trim: true
  },
   maxEffective: {
    type: Number,
    default: '',
    required: 'Please fill maxEffective name',
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

mongoose.model('Manufacturelinetype', ManufacturelinetypeSchema);
