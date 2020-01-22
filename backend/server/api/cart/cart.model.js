'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  uid: {type:Schema.Types.ObjectId,ref:'User'},
  productId: {type:Schema.Types.ObjectId,ref:'Product'},
  message: String,
  quantity: Number,
  active: { type: Boolean, required: true, default: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
});

module.exports = mongoose.model('Cart', CartSchema);