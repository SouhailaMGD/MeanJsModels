'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Variant Schema
 */
var VariantSchema = new Schema({
   colorValue: {
    type: String,
    default: '',
    required: 'Please fill Variant Color',
    trim: true
  },
   size: {
    type: String,
    default: '',
    required: 'Please fill Variant netPrice',
    trim: true
  },
   letterSize: {
    type: String,
    default: '',
    required: 'Please fill Variant invoiceDate',
    trim: true
  },
   quantity: {
    type: Number,
    default: '',
    required: 'Please fill Variant quantity',
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

mongoose.model('Variant', VariantSchema);
