'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  fullname: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true,
    match : /^[a-zA-Z]*$/
  },
   email: {
    type: String,
    default: '',
    required: 'Please fill Employee email',
    trim: true,
    match : /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
     phone: {
    type: String,
    default: '',
    required: 'Please fill Employee phone',
    trim: true,
    match : /^[5-6][0-9]+$/
  },
     hiringDate: {
    type: String,
    default: '',
    required: 'Please fill Employee hiringDate',
    trim: true
  },
     terminationDate: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
  },
     job: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
  },
     identifier: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
  },
     state: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
  },
     address: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true,
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

mongoose.model('Employee', EmployeeSchema);
