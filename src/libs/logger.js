//https://github.com/nomiddlename/log4js-node
"use strict";
const env = process.env.NODE_ENV || "test"

const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const logDir = `${appDir}/logs`;

//create the log directory if it does not exist
if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}

const { createLogger, format, transports } = require('winston');

var options = {
    console: {
        // timestamp: tsFormat,
        // formatter: function(options) {
        //   // Return string will be passed to logger.
        //   return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
        //     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        // },    
        handleExceptions: true,
        json: false,
        colorize: true,        
        
        level: env === 'test' ? 'info' : 'error'
      },
      file: {
        level: 'error',
        filename: `${logDir}/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },


};

const logger = createLogger({
    transports: [
      new transports.Console(options.console),
      new transports.File(options.file)
    ]
});

module.exports = logger