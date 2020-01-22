'use strict';

var express = require('express');
var controller = require('./cart.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('user'), controller.index);
router.get('/product/:id', auth.hasRole('user'), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/addtocart/:id', auth.hasRole('user') ,controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;