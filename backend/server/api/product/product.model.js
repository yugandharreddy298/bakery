'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  masterProductID: {type:Schema.Types.ObjectId,ref:'Masterproduct'},
  vendorId:{type:Schema.Types.ObjectId,ref:'User'},
  weight: [{type: String}],
  quantity: Number,
  price: Number,
  pricetype: String,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);