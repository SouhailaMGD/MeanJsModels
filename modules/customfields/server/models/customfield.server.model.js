'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customfield Schema
 */
var CustomfieldSchema = new Schema({
  fieldType: {
    type: String,
    default: '',
    required: 'Please fill Customfield type',
    trim: true
  },
  fieldName: {
    type: String,
    default: '',
    required: 'Please fill Customfield name',
    trim: true
  },
  fieldCode: {
    type: String,
    default: '',
    required: 'Please fill Customfield code',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Customfield description',
    trim: true
  },
  required: {
    type: String,
    default: 'false',
    trim: true
  },
  fieldTypeParameter :{
    type : Array,
    default : [],
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

mongoose.model('Customfield', CustomfieldSchema);
