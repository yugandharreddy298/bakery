/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Masterproduct = require('../api/masterproduct/masterproduct.model');
var Category = require('../api/category/category.model');
var Product = require('../api/product/product.model');
var Cart = require('../api/cart/cart.model');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

// Insert seed data below
var masterproductSeed = require('../api/masterproduct/masterproduct.seed.json');
var categorySeed = require('../api/category/category.seed.json');
var productSeed = require('../api/product/product.seed.json');
var cartSeed = require('../api/cart/cart.seed.json');
var thingSeed = require('../api/thing/thing.seed.json');

// Insert seed inserts below
Masterproduct.find({}).remove(function() {
	Masterproduct.create(masterproductSeed);
});

Category.find({}).remove(function() {
	Category.create(categorySeed);
});

Product.find({}).remove(function() {
	Product.create(productSeed);
});

Cart.find({}).remove(function() {
	Cart.create(cartSeed);
});

Thing.find({}).remove(function() {
  Thing.create(thingSeed);
});