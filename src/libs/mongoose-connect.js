'use strict';
const config = require('../config/get-config');

const logger = require('./logger');

const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'test'
const mongodb = config.db[env].mongo;
// mongoose.connect(mongodb.uri, mongodb.options, function(err) {
//   if(err) {
//      logger.error(`Mongoose default connection error: ${err.stack}`);
//      process.exit(0);
//   }
// });
let mongo_config =  mongodb.options;
console.log(`mongodb://${mongo_config.user}:${mongo_config.pass}@localhost:${mongodb.port}/test`);

if(env == 'test'){
  mongoose.connect(`mongodb://localhost:${mongodb.port}/test`, function(err) {
    if(err) {
       logger.error(`Mongoose default connection error: ${err.stack}`);
       process.exit(0);
    }
  });  
}else{
  mongoose.connect(`mongodb://${mongo_config.user}:${mongo_config.pass}@localhost:${mongodb.port}/test`, function(err) {
    if(err) {
       logger.error(`Mongoose default connection error: ${err.stack}`);
       process.exit(0);
    }
  });  
}


// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]' [, options]);

// CONNECTION EVENTS
// When successfully connected
const db = mongoose.connection;

db.on('connected', function () {  
  logger.debug('Mongoose connected...');
}); 

//If the connection throws an error
db.on('error',function (err) {  
  logger.error('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
db.on('disconnected', function (err) {  
  logger.error(`Mongoose default connection disconnected: ${err}`); 
});

// If the Node process ends, close the Mongoose connection 
// process.on('SIGINT', function() {  
//   mongoose.connection.close(function () { 
//     console.log('Mongoose default connection disconnected through app termination'); 
//     process.exit(0); 
//   }); 
// }); 

