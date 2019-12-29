'use strict';

var _ = require('lodash');
var Emailservice = require('./emailservice.model');

// Get list of emailservices
exports.index = function(req, res) {
  Emailservice.find(function (err, emailservices) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(emailservices);
  });
};

// Get a single emailservice
exports.show = function(req, res) {
  Emailservice.findById(req.params.id, function (err, emailservice) {
    if(err) { return handleError(res, err); }
    if(!emailservice) { return res.status(404).send('Not Found'); }
    return res.json(emailservice);
  });
};

// Creates a new emailservice in the DB.
exports.create = function(req, res) {
  Emailservice.create(req.body, function(err, emailservice) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(emailservice);
  });
};

// Updates an existing emailservice in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Emailservice.findById(req.params.id, function (err, emailservice) {
    if (err) { return handleError(res, err); }
    if(!emailservice) { return res.status(404).send('Not Found'); }
    var updated = _.merge(emailservice, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(emailservice);
    });
  });
};

// Deletes a emailservice from the DB.
exports.destroy = function(req, res) {
  Emailservice.findById(req.params.id, function (err, emailservice) {
    if(err) { return handleError(res, err); }
    if(!emailservice) { return res.status(404).send('Not Found'); }
    emailservice.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}