'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  masterProductId: {type:Schema.Types.ObjectId,ref:'Masterproduct'},
  vendorId:{type:Schema.Types.ObjectId,ref:'User'},
  category:{type:Schema.Types.ObjectId,ref:'Category'},
  weight: [{type: String}],
  quantity: Number,
  price: Number,
  pricetype: String,
  title: String,
  description: String,
  slug: String,
  metatag: String,
  metatagdescription: String,
  images:[{type:Schema.Types.ObjectId,ref:'Image'}],
  thumbnail:{type:Schema.Types.ObjectId,ref:'Image'},
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);