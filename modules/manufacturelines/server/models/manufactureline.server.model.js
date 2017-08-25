'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Manufactureline Schema
 */
var ManufacturelineSchema = new Schema({
   effective: {
    type: Number,
    default: '',
    required: 'Please fill Manufactureline effective',
    trim: true
  },
   state: {
    type: String,
    default: '',
    required: 'Please fill Manufactureline state',
    trim: true
  },
   inputTerminalState: {
    type: Boolean,
    default: false,
    trim: true
  },
   outputTerminalState: {
    type: Boolean,
    default: false,
    trim: true
  },
  displayState: {
    type: Boolean,
    default: false,
    trim: true
  },
   processOrder: {
    type: Number,
    default: '',
    required: 'Please fill Manufactureline processOrder',
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

mongoose.model('Manufactureline', ManufacturelineSchema);
