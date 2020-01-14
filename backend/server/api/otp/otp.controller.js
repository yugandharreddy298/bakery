'use strict';

var _ = require('lodash');
var Otp = require('./otp.model');
var User = require('../user/user.model');

// Get list of otps
exports.index = function(req, res) {
  Otp.find(function (err, otps) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(otps);
  });
};

// Get a single otp
exports.show = function(req, res) {
  Otp.findById(req.params.id, function (err, otp) {
    if(err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    return res.json(otp);
  });
};

// Creates a new otp in the DB.
exports.create = function(req, res) {
  Otp.create(req.body, function(err, otp) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(otp);
  });
};

// Updates an existing otp in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Otp.findById(req.params.id, function (err, otp) {
    if (err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    var updated = _.merge(otp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(otp);
    });
  });
};

// Deletes a otp from the DB.
exports.destroy = function(req, res) {
  Otp.findById(req.params.id, function (err, otp) {
    if(err) { return handleError(res, err); }
    if(!otp) { return res.status(404).send('Not Found'); }
    otp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.checkOtp = function(req, res) {
  var timestamp = moment().format('ddd, MMM D, YYYY hh:mm:ss A')
  const otp = req.body.otp;
  Otp.findOne({ IP: req.body.IP }).sort({ _id: -1 }).exec(function(err, otpDoc) {
      if (new Date(otpDoc.expire_at) >= new Date(timestamp)) {

          if (otpDoc.otp == otp) {
              res.status(200).json({ "res": "success" })
          } else {
              var count = ++otpDoc.expire_count;
              otpDoc.expire_count = count;
              otpDoc.updated_at = Date.now();
              otpDoc.save(function(err) {
                  if (err) return validationError(res, err);
              });

              if (count >= 4) {
                  User.findOne({ email: otpDoc.email }, function(err, user) {
                      user.status = false;
                      user.updated_at = Date.now();
                      user.save(function(err) {
                          if (err) return validationError(res, err);
                          res.status(200).json({ "res": "block" })
                      });
                  });
              } else {
                  res.status(200).json({ "res": "OTPFAILED" })
              }
          }
      } else {
          res.status(200).json({ "res": "OTP-expired" });
      }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}