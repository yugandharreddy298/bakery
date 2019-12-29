'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  info: String,
  originalfilename:String,
  path:String,
  size:String,
  type:String,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: {type:Boolean,default:true},  
});

module.exports = mongoose.model('Image', ImageSchema);