'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  commandReference: {
    type: String,
    default: '',
    required: 'Please fill commandRefrence',
    trim: true
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Project name',
    trim: true,
    match : /^[a-zA-Z][a-zA-Z0-9]*$/
  },
  plannedAt: {
    type: String,
    default: ''+Date.now,
    required: 'Please fill plan date',
    trim: true
    },
  deliveredAt: {
    type: String,
    default: '',
    required: 'Please fill delivery date',
    trim: true
  },
  clientPlannedAt: {
    type: String,
    default: '',
    required: 'Please fill client plan date',
    trim: true
  },
  clientDeliveredAt: {
    type: String,
    default: '',
    required: 'Please fill client delivery date',
    trim: true
  },
  note: {
    type: String,
    default: '',
    trim: true
  },
  state: {
    type: String,
    default: '',
    required: 'Please fill Project sate',
    trim: true,
  },
  estimeBudget: {
    type: Number,
    default: '',
    required: 'Please fill Project estimeBudget',
    trim: true
  },
  clientBudget: {
    type: Number,
    default: '',
    required: 'Please fill Project clientBudget',
    trim: true
  },
  budget: {
    type: Number,
    default: '',
    required: 'Please fill Project budget',
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
module.exports = mongoose.model('Project', ProjectSchema);
