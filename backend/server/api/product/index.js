'use strict';

var express = require('express');
var controller = require('./product.controller');
var auth = require('../../auth/auth.service');
var multiparty = require('connect-multiparty')
var path = require('path');
var multipartyMiddleware = multiparty();

var router = express.Router();
router.use(multiparty({uploadDir: path.dirname('./uploads'+'/uploads')}));

router.get('/', controller.index);
router.get('/getVendorProducts/:id', controller.getVendorProducts);
router.get('/category/:category', controller.getProductsByCategory);

router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;