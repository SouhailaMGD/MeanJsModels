'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
  fullname : {
    type: String,
    default: '',
    required: 'Please fill Customer name',
    trim: true,
    match : /^[a-zA-Z][a-zA-Z]+$/
  },

  company_Name : {
    type: String,
    default: '',
    required: 'Please fill Customer company name',
    trim: true,
    match : /^[a-zA-Z]*$/
  },
  email : {
    type: String,
    default: '',
    required: 'Please fill Customer email',
    trim: true,
    match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,

  },
  phone : {
    type: String,
    default: '',
    required: 'Please fill Customer phone',
    trim: true,
    match : /^[5-6][0-9]+$/
  },
   address : {
    type: String,
    default: '',
    required: 'Please fill Customer address',
    trim: true
  },
  created : {
    type : Date,
    default: Date.now
  },
  user : {
    type : Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);
