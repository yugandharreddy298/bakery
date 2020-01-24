'use strict';

var _ = require('lodash');
var Banner = require('./banner.model');
var Image = require('../image/image.model')

// Get list of banners
exports.index = function(req, res) {
  Banner.find().populate('banner','path').exec(function (err, banners) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(banners);
  });
};

// Get a single banner
exports.show = function(req, res) {
  Banner.findById(req.params.id, function (err, banner) {
    if(err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    return res.json(banner);
  });
};

// Creates a new banner in the DB.
exports.create = function(req, res) {
  var bulkdata=[]
  var images = []
  console.log(req.files)
  if(req.files.banner)
    images.push(req.files.banner)
  images.forEach(element => {
    let file = {}
    file.originalFilename = element.originalFilename;
    file.path = element.path;
    file.path = file.path.replace("../", "");
    file.path = file.path.replace("backend/", "");
    file.size = element.size;
    file.type = element.type;
    file.name = element.name;
    bulkdata.push(file)
  });

  var data=JSON.parse(req.body.data)
  
  Image.create(bulkdata[0], function(err, imageDoc) {
    if(err) { return handleError(res, err); }
    data.banner=imageDoc._id
    console.log('================>',data)
    Banner.create(data, function(err, banner) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(banner);
    });
  });
};

// Updates an existing banner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Banner.findById(req.params.id, function (err, banner) {
    if (err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    var updated = _.merge(banner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(banner);
    });
  });
};

// Deletes a banner from the DB.
exports.destroy = function(req, res) {
  Banner.findById(req.params.id, function (err, banner) {
    if(err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    banner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}