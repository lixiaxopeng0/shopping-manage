const express = require('express');
const fs = require('fs');
const {encrypt, decrypt} = require('../utils/login');
const userRoute = express.Router();

// 登录信息
const userInfoPath = './user.json';
let user_info = {};
const manager = {manager: {pwd: encrypt('123456'), email: '1111111@163.com'}};

// 登录
userRoute.post('/login', (req, res) => {
  const token = res.locals.data;
  const {name, password} = req.body;
  let responseData = {};
  // 判断文件是否存在
  if (!fs.existsSync(userInfoPath)) {
    fs.writeFileSync(userInfoPath, JSON.stringify(manager));
    user_info = JSON.stringify(manager);
  }
  const data = fs.readFileSync(userInfoPath, 'utf-8');
  user_info = JSON.parse(data);
  const loginUPwd = user_info?.[name]?.pwd;
  if (!loginUPwd) {
    responseData = {data: null, status: 300, message: '密码或用户错误'};
  }
  if (loginUPwd && decrypt(loginUPwd) === password) {
    responseData = {data: token, status: 200, message: '登录成功'};
  }
  if (loginUPwd && decrypt(loginUPwd) !== password) {
    responseData = {data: null, status: 300, message: '密码或用户错误'};
  }
  res.json(responseData);
});
// 注册
userRoute.post('/register', (req, res) => {
  const {name, password, email} = req.body;
  const token = res.locals.data;
  let responseData = {};
  // 判断文件是否存在
  if (!fs.existsSync(userInfoPath)) {
    fs.writeFileSync(userInfoPath, JSON.stringify(manager));
    user_info = JSON.stringify(manager);
  }
  const data = fs.readFileSync(userInfoPath, 'utf-8');
  user_info = JSON.parse(data);
  const loginUPwd = user_info?.[name];
  if (loginUPwd) {
    responseData = {data: null, status: 300, message: '该用户已存在'};
  } else {
    fs.writeFileSync(
      userInfoPath,
      JSON.stringify({
        ...user_info,
        [name]: {
          pwd: encrypt(password),
          email: email,
        },
      })
    );
    responseData = {data: token, status: 200, message: '注册成功'};
  }
  res.json(responseData);
});

// 黑名单和白名单
const blacklist = [];
// 白名单
const whitelist = [];
// 定义刷新 Token 的接口
userRoute.post('/refresh', (req, res) => {
  const token = res.locals.data;
  // 检查请求的来源是否合法（自用不写）
  // const ipAddress = req.socket.remoteAddress;
  // const userAgent = req.get('user-agent');
  // if (blacklist.includes(ipAddress) || !whitelist.includes(userAgent)) {
  //   return res.status(403).send('Illegal request');
  // }

  res.json({token, status: 200});
});

module.exports = userRoute;
