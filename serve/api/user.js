const express = require('express');
const fs = require('fs');
const {encrypt, decrypt} = require('../utils/login');
const userRoute = express.Router();

// 登录信息
const userInfoPath = './user.json';
let user_info = {};
const manager = {manager: encrypt('123456')};

// 登录
userRoute.post('/login', (req, res) => {
  const {name, password} = req.body;
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
    responseData = {data: null, status: 300, message: '无该用户'};
  }
  if (decrypt(loginUPwd) === password) {
    responseData = {data: null, status: 200, message: '登录成功'};
  } else {
    responseData = {data: null, status: 300, message: '密码或用户错误'};
  }
  res.json(responseData);
});
// 注册
userRoute.post('/register', (req, res) => {
  const {name, password} = req.body;
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
      JSON.stringify({...user_info, [name]: encrypt(password)})
    );
    responseData = {data: null, status: 200, message: '注册成功'};
  }
  res.json(responseData);
});

module.exports = userRoute;
