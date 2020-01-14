'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Image = require('../image/image.model');
var async = require('async');
var fs = require('fs');

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads')
// Get list of categorys
exports.index = function(req, res) {
  Category.find(function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = async function(req, res) {
  console.log("req body  ----------------")
  var imageIDs=[];
  var bulkdata=[]
  var images = []
  console.log(typeof(req.files.images),req.files.length)
  if(req.files.images.length)
    images = req.files.images    
  else
    images.push(req.files.images)
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
  Image.create(bulkdata, function(err, imagesDoc) {
    if(err) { return handleError(res, err); }
    imagesDoc.forEach(ele =>{
      imageIDs.push(ele._id)
    })
    var data=JSON.parse(req.body.data)
    data.images=imageIDs
    console.log('================>',data)
    Category.create(data, function(err, category) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(category);
    });
  });
  

};

async function craeteImages(imagesArray){
  var images=[]
  console.log(imagesArray)
  // async.eachSeries(imagesArray, function (element, callback) {
    // req.files.images.forEach(element => {
      // console.log(element)
    
    return images
}
// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}