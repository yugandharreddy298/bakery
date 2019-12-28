'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  productID: {type:Schema.Types.ObjectId,ref:'Product'},
  message: String,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Cart', CartSchema);