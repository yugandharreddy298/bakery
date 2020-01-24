'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  uid: {type:Schema.Types.ObjectId,ref:'User'},
  // productsList: [{type:Schema.Types.ObjectId,ref:'Product'}],
  cartList: [{type:Schema.Types.ObjectId,ref:'Cart'}],
  totalAmount: Number,
  active: { type: Boolean, required: true, default: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
});

module.exports = mongoose.model('Order', OrderSchema);