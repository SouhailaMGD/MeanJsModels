'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rawmaterialreminder Schema
 */
var RawmaterialreminderSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Rawmaterialreminder name',
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

mongoose.model('Rawmaterialreminder', RawmaterialreminderSchema);
