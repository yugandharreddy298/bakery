'use strict';

var _ = require('lodash');
var Masterproduct = require('./masterproduct.model');

// Get list of masterproducts
exports.index = function(req, res) {
  Masterproduct.find(function (err, masterproducts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(masterproducts);
  });
};

// Get a single masterproduct
exports.show = function(req, res) {
  Masterproduct.findById(req.params.id, function (err, masterproduct) {
    if(err) { return handleError(res, err); }
    if(!masterproduct) { return res.status(404).send('Not Found'); }
    return res.json(masterproduct);
  });
};

// Creates a new masterproduct in the DB.
exports.create = function(req, res) {
  Masterproduct.create(req.body, function(err, masterproduct) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(masterproduct);
  });
};

// Updates an existing masterproduct in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Masterproduct.findById(req.params.id, function (err, masterproduct) {
    if (err) { return handleError(res, err); }
    if(!masterproduct) { return res.status(404).send('Not Found'); }
    var updated = _.merge(masterproduct, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(masterproduct);
    });
  });
};

// Deletes a masterproduct from the DB.
exports.destroy = function(req, res) {
  Masterproduct.findById(req.params.id, function (err, masterproduct) {
    if(err) { return handleError(res, err); }
    if(!masterproduct) { return res.status(404).send('Not Found'); }
    masterproduct.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}