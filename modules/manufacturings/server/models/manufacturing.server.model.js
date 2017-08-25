'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Manufacturing Schema
 */
var ManufacturingSchema = new Schema({
   input: {
    type: Number,
    default: '',
    required: 'Please fill Manufacturing input',
    trim: true
  },
   output: {
    type: Number,
    default: '',
    required: 'Please fill Manufacturing output',
    trim: true
  },
   savedAt: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing savedAt',
    trim: true
    //,match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

  },
    releasedAt: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing releasedAt',
    trim: true//,match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

  },
     state: {
    type: String,
    default: '',
    required: 'Please fill Manufacturing state',
    trim: true
  },
     note: {
    type: String,
    default: '',
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

mongoose.model('Manufacturing', ManufacturingSchema);
