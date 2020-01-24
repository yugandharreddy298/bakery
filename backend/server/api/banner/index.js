'use strict';

var express = require('express');
var controller = require('./banner.controller');
var auth = require('../../auth/auth.service');
var multiparty = require('connect-multiparty')
var path = require('path');
var multipartyMiddleware = multiparty();
var router = express.Router();
router.use(multiparty({uploadDir: path.dirname('./uploads'+'/uploads')}));

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), multipartyMiddleware, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;