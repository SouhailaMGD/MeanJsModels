'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Productcategory Schema
 */
var ProductcategorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Productcategory name',
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

mongoose.model('Productcategory', ProductcategorySchema);
