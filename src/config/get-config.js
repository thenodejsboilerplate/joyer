'use strict';
const env = process.env.NODE_ENV || 'test';
const config = require(`../../config.${env}.js`);
const logger = require('../libs/logger');
logger.log('info',`env is ${env}`);

if (!config){
  logger.error('配置文件`config.${env}.js`不存在!')
  throw new Error('配置文件`config.${env}.js`不存在!');
}


module.exports = config;
