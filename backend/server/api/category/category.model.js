'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  description: String,
  slug: String,
  metatag: String,
  metatagdescription: String,
  images:[],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);