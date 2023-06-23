const jwt = require('jsonwebtoken');
const fs = require('fs');
const Mock = require('mockjs');
const {userInfoPath, secret} = require('../dicts');
const {encrypt, decrypt} = require('../utils/login');

// const secret = 'shop-list';

// 注册时，默认注册一个账户
const manager = {
  manager: {
    pwd: encrypt('123456'),
    email: '1111111@163.com',
    id: Mock.mock('@id'),
    loginStatus: false,
  },
};
const jwtToekn = (req, res, next) => {
  //   console.log('Original URL:', req?.body);
  const url = req.url || req.originalUrl;
  if (['/user/login', '/user/register', '/user/user-update']) {
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
  if (['/user/login', '/user/register', '/user/refresh'].includes(url)) {
    const {name} = req?.body;
    // 生成 Token
    const payload = {username: name};
    const options = {expiresIn: '3h'};
    const token = jwt.sign(payload, secret, options);
    // 将处理后的数据保存到 res.locals 中
    res.locals.data = token;
    next();
  } else {
    const token = req.headers['authorization']?.split(' ')[1];
    //  验证 Token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({data: null, status: 400, message: 'token无效'});
      } else {
        console.log('Token is valid.');
        console.log(decoded);
        next();
      }
    });
  }
};

module.exports = jwtToekn;
