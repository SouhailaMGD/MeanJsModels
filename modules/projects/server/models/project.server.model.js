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
    trim: true,
    //match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
  deliveredAt: {
    type: String,
    default: '',
    required: 'Please fill delivery date',
    trim: true,
    //match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
  clientPlannedAt: {
    type: String,
    default: '',
    required: 'Please fill client plan date',
    trim: true,
    //match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
  clientDeliveredAt: {
    type: String,
    default: '',
    required: 'Please fill client delivery date',
    trim: true,
    //match : /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
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
