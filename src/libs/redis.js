//it's the underground for ./cache.js, which wrap the redis function
"use strict";
var config = require('../config/get-config');
var Redis = require('ioredis');
var logger = require('./logger')
const env = process.env.NODE_ENV || 'test'

var client;
client = new Redis({
	  port: config.db[client].redis.port,
	  host: config.db[client].redis.test.host,
	  db: config.db[client].redis.db,
	  password: config.db[client].redis.password
});

client.on('ready',function(err) {
	if(err){
	    logger.error('connect to redis error for ready , check your redis config',errr);		
	}

    logger.trace("Redis is ready");
// //logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
});

client.on("connect", runSample);
//without expiration version:
// function runSample() {
//     // Set a value
//     client.set("string key", "Hello World", function (err, reply) {
//         console.log(reply.toString());
//     });
//     // Get a value
//     client.get("string key", function (err, reply) {
//         console.log(reply.toString());
//     });
// }
function runSample() {
    // Set a value with an expiration
    client.set('string key', 'Hello World', Redis.print);
    // Expire in 3 seconds
    client.expire('string key', 3);
 
    // This timer is only to demo the TTL
    // Runs every second until the timeout
    // occurs on the value
    var myTimer = setInterval(function() {
        client.get('string key', function (err, reply) {
            if(reply) {
                console.log('I live: ' + reply.toString());
            } else {
                clearTimeout(myTimer);
                console.log('I expired');
                client.quit();
            }
        });
    }, 1000);
}

client.on('error', function (err) {
  if (err) {
    logger.error('connect to redis error, check your redis config', err);
    process.exit(1);
  }
});



exports = module.exports = client;