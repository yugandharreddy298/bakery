'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BannerSchema = new Schema({
  title: String,
  description: String,
  banner:{type:Schema.Types.ObjectId,ref:'Image'},
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Banner', BannerSchema);