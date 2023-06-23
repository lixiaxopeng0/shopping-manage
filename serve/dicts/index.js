const path = require('path');

// 用户信息，短时间代替数据库地址
const userInfoPath = path.join(__dirname, '../api/./user.json');
// token签名
const secret = 'shop-list';

module.exports = {
  userInfoPath,
  secret,
};
