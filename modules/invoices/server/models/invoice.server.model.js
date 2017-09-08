'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
   totalPrice: {
    type: Number,
    default: '',
    required: 'Please fill Invoice totalPrice',
    trim: true
  },
   netPrice: {
    type: Number,
    default: '',
    required: 'Please fill Invoice netPrice',
    trim: true
  },
  invoiceDate: {
    type: String,
    default: '',
    required: 'Please fill Invoice Date',
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

mongoose.model('Invoice', InvoiceSchema);
