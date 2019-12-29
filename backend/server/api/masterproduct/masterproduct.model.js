'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MasterproductSchema = new Schema({
  categoryID: {type:Schema.Types.ObjectId,ref:'Category'},
  name: String,
  info: String,
  type: String,
  sku: String,
  weight: [{ type: String }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Masterproduct', MasterproductSchema);