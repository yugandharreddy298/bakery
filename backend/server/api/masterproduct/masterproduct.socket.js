/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Masterproduct = require('./masterproduct.model');

exports.register = function(socket) {
  Masterproduct.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Masterproduct.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('masterproduct:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('masterproduct:remove', doc);
}