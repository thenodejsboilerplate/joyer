/**
 * message in flash
 */

var path = require('path');

var config = {

  user: {
    success: '注册成功',
    info: '',
    error: {
      userNotExist: '用户不存在',
      wrongPassport: '密码错误',
      wrongEmail: '密码错误'
    }
  }

};

module.exports = config;