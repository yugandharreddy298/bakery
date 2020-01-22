'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var Category = require('../category/category.model')
var Image = require('../image/image.model')
var Masterproduct = require('../masterproduct/masterproduct.model')
// Get list of products
exports.index = function(req, res) {
  Product.find().populate('thumbnail').exec(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id).populate({path:'masterProductId',populate:{path:'category'}}).populate('category').populate('thumbnail').populate('images').exec(function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// Get a vendor products
exports.getVendorProducts = function(req, res) {
  Product.find({vendorId:req.params.id}, function (err, products) {
    if(err) { return handleError(res, err); }
    if(!products) { return res.status(404).send('Not Found'); }
    return res.json(products);
  });
};

exports.getProductsByCategory = function(req,res) {
  Category.findOne({name:req.params.category}, function(err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Category Not found'); }
    Masterproduct.find({categoryID:category._id}, function(err, masterproducts) {
      if(err) { return handleError(res, err); }
      if(!masterproducts) { return res.status(404).send('Masterproducts Not Found'); }
      // return res.json(masterproducts);
      Product.find({category:category._id}, function(err, products) {
        if(err) { return handleError(res, err); }
        if(!products) { return res.status(404).send('Products Not Found'); }
        return res.json(products);
      })
    })
    
  })

}
// Creates a new product in the DB.
exports.create = function(req, res) {
  var imageIDs=[];
  var bulkdata=[]
  var images = []
  console.log(req.files)
  console.log(typeof(req.files.images),req.files.length)
  if(req.files.images.length)
    images = req.files.images    
  else
    images.push(req.files.images)
  if(req.files.thumbnail)
    images.push(req.files.thumbnail)
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
  
  Image.create(bulkdata, function(err, imagesDoc) {
    if(err) { return handleError(res, err); }
    imagesDoc.forEach((ele,index) =>{
      if(req.files.thumbnail && index==imagesDoc.length-1)
        data.thumbnail=ele._id
      else      
        imageIDs.push(ele._id)
    })
    data.images=imageIDs
    console.log('================>',data)
    Product.create(data, function(err, product) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(product);
    });
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}