'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Terminalcategory Schema
 */
var TerminalcategorySchema = new Schema({
    name: {
    type: String,
    default: '',
    required: 'Please fill Terminalcategory name',
    trim: true
  },
  Description: {
    type: String,
    default: '',
    trim: true
  },
  type: {
    type: String,
    default: '',
    required: 'Please fill Terminalcategory type',
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

mongoose.model('Terminalcategory', TerminalcategorySchema);
