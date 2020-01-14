'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OtpSchema = new Schema({
  IP: String,
  otp: String,
  expire_count: {type: Number, default: 0},
  email: { type: String, lowercase: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date,
  active: Boolean,
});

module.exports = mongoose.model('Otp', OtpSchema);