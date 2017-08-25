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
  //  match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
     terminationDate: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
    //match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
     job: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
    //match : /^[a-zA-Z0-9]*$/
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
