/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/banner', require('./api/banner'));    
  app.use('/api/order', require('./api/order'));  
  app.use('/api/otp', require('./api/otp'));
  app.use('/api/emailservices', require('./api/emailservice'));
  app.use('/api/image', require('./api/image'));
  app.use('/api/masterproduct', require('./api/masterproduct'));
  app.use('/api/category', require('./api/category'));
  app.use('/api/product', require('./api/product'));
  app.use('/api/cart', require('./api/cart'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  

};
