'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var Image = require('../image/image.model');

// Get list of user carts
exports.index = function(req, res) {
  Cart.find({ $and: [{ uid: req.user._id }, { active: true }] }).populate({path:'productId',populate:{path:'thumbnail'}}).exec(function (err, carts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(carts);
  });
};

// Get a single cart
exports.show = function(req, res) {
  Cart.findOne({ $and: [{ uid: req.user._id }, { productId: req.params.id }, { active: true }] }).exec(function (err, cart) {
    if(err) { return handleError(res, err); }
    if(!cart) { return res.status(404).send('Not Found'); }
    return res.json(cart);
  });
};

// Creates a new cart in the DB.
exports.create = function(req, res) {
  Cart.create(req.body, function(err, cart) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cart);
  });
};

// Update/create an existing cart in the DB.
exports.update = function(req, res) {
  console.log(req.body)
  if(req.body._id) { delete req.body._id; }
  Cart.findOne({ $and: [{ uid: req.user._id },{ productId: req.params.id }, { active: true }] }).exec(function (err, cart) {
    if (err) { return handleError(res, err); }
    console.log(cart)
    
    if(!cart) { 
      req.body.uid = req.user._id
      Cart.create(req.body, function(err, cart) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(cart);
      });
     }
     else {
      console.log(cart)
      if(req.body.mode=='add'){
        req.body.quantity=req.body.quantity+cart.quantity
      }
      else if(req.body.mode=='update'){
        req.body.quantity=req.body.quantity
      }
      var updated = _.merge(cart, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(cart);
      });
     }
  });
};

// Deletes a cart from the DB.
exports.destroy = function(req, res) {
  Cart.findById(req.params.id, function (err, cart) {
    if(err) { return handleError(res, err); }
    if(!cart) { return res.status(404).send('Not Found'); }
    cart.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}