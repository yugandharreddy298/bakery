'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost:27017/Bakery'
    // uri: 'mongodb://developer:784230@cluster0-shard-00-00-wpiol.mongodb.net:27017,cluster0-shard-00-01-wpiol.mongodb.net:27017,cluster0-shard-00-02-wpiol.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    uri: 'mongodb://developer:123456pP@ds157256.mlab.com:57256/cakes'
  },

  seedDB: true
};
