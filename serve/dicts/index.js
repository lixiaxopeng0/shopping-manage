const path = require('path');

// 静态抛出地址
const staticPath = path.join(__dirname, '../public');
// 用户信息，短时间代替数据库地址
const userInfoPath = path.join(__dirname, '../info/user.json');
// 用户信息，短时间代替数据库地址
const shopListInfoPath = path.join(__dirname, '../info/shopList.json');
// token签名
const secret = 'shop-list';
// 图片存放地址
const imagesPath = path.join(staticPath, './images');

module.exports = {
  staticPath,
  userInfoPath,
  secret,
  imagesPath,
  shopListInfoPath,
};
