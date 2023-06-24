const jwt = require('jsonwebtoken');
const Mock = require('mockjs');
const {secret} = require('../dicts');
const {encrypt} = require('../utils/login');

const jwtToekn = (req, res, next) => {
  const url = req.url || req.originalUrl;
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
