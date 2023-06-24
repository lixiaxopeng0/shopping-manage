const fs = require('fs');
const Mock = require('mockjs');
const {userInfoPath} = require('../dicts');
const {encrypt} = require('../utils/login');

// 注册时，默认注册一个账户
const manager = {
  manager: {
    pwd: encrypt('123456'),
    email: '1111111@163.com',
    id: Mock.mock('@id'),
    loginStatus: false,
  },
};
const userInfoGet = (req, res, next) => {
  const url = req.url || req.originalUrl;
  if (url.startsWith('/user')) {
    let user_info = {};
    // 用户名，头像地址
    // 判断文件是否存在
    if (!fs.existsSync(userInfoPath)) {
      fs.writeFileSync(userInfoPath, JSON.stringify(manager));
      user_info = JSON.stringify(manager);
    }
    const data = fs.readFileSync(userInfoPath, 'utf-8');
    user_info = JSON.parse(data);
    res.locals.user_info = user_info;
  }
  next();
};

module.exports = userInfoGet;
