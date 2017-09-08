'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stock Schema
 */
var StockSchema = new Schema({
    quantity: {
    type: Number,
    default: '',
    required: 'Please fill Stock quantity',
    trim: true
  },
    importDate: {
    type: String,
    default: ''+Date.now,
    required: 'Please fill Stock importDate',
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

mongoose.model('Stock', StockSchema);
