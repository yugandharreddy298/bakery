/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Banner = require('./banner.model');

exports.register = function(socket) {
  Banner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Banner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('banner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('banner:remove', doc);
}