'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Terminal Schema
 */
var TerminalSchema = new Schema({
  macAddress: {
    type: String,
    default: '',
    required: 'Please fill Terminal macAddress',
    trim: true,
    match : /^[0-9a-fA-F]{1,2}([\.:-])(?:[0-9a-fA-F]{1,2}\1){4}[0-9a-fA-F]{1,2}$/
  },
   ipAddress: {
    type: String,
    default: '',
    required: 'Please fill Terminal ipAddress',
    trim: true,
    match : /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  },

  state: {
    type: String,
    default: '',
    required: 'Please fill Terminal state',
    trim: true
  
  },
   authorization: {
    type: String,
    default: '',
    required: 'Please fill Terminal authorization',
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

mongoose.model('Terminal', TerminalSchema);
