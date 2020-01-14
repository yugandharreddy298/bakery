/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below

var User = require('../api/user/user.model');

// Insert seed data below

var userSeed = require('../api/user/user.seed.json');

// Insert seed inserts below

User.find({}).remove(function() {
  User.create(userSeed);
});