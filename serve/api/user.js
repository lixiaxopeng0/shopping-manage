const express = require('express');
const fs = require('fs');
const path = require('path');
const Mock = require('mockjs');
const multiparty = require('multiparty');
const {encrypt, decrypt} = require('../utils/login');
const {userInfoPath} = require('../dicts');
const userRoute = express.Router();

// 不接入数据库，简单记录状态
// let loginUser = [];
// 修理loginUser
// const handleLoginUser = (loginData, data) => {
//   const loginIndex = loginData.findIndex((i) => i.name === data?.name);
//   if (loginIndex >= 0) {
//     loginData[loginIndex] = data;
//   } else {
//     console.log(data, '===sss');
//     loginData.push(data);
//   }
// };

// 登录信息
// const userInfoPath = './user.json';
// let user_info = {};

// 登录
userRoute.post('/login', (req, res) => {
  // let user_info = {};
  let user_info = res.locals.user_info || {};
  const token = res.locals.data;
  const {name, password} = req.body;
  let responseData = {};
  // 用户名，头像地址
  // 判断文件是否存在
  // if (!fs.existsSync(userInfoPath)) {
  //   fs.writeFileSync(userInfoPath, JSON.stringify(manager));
  //   user_info = JSON.stringify(manager);
  // }
  // const data = fs.readFileSync(userInfoPath, 'utf-8');
  // user_info = JSON.parse(data);
  const loginUPwd = user_info?.[name]?.pwd;
  if (!loginUPwd) {
    responseData = {data: null, status: 300, message: '密码或用户错误'};
  }
  if (loginUPwd && decrypt(loginUPwd) === password) {
    const {pwd, ...userInfo} = user_info?.[name];
    responseData = {
      data: {token, userInfo: {...userInfo, name}},
      status: 200,
      message: '登录成功',
    };
    // 更新登录状态
    user_info[name].loginStatus = true;
    fs.writeFileSync(userInfoPath, JSON.stringify(user_info));
    // handleLoginUser(loginUser, req.body);
  }
  if (loginUPwd && decrypt(loginUPwd) !== password) {
    responseData = {data: null, status: 300, message: '密码或用户错误'};
  }
  res.json(responseData);
});
// 注册
userRoute.post('/register', (req, res) => {
  // let user_info = {};
  let user_info = res.locals.user_info || {};
  const {name, password, email} = req.body;
  const token = res.locals.data;
  let responseData = {};
  // 判断文件是否存在
  // if (!fs.existsSync(userInfoPath)) {
  //   fs.writeFileSync(userInfoPath, JSON.stringify(manager));
  //   user_info = JSON.stringify(manager);
  // }
  // const data = fs.readFileSync(userInfoPath, 'utf-8');
  // user_info = JSON.parse(data);
  const loginUPwd = user_info?.[name];
  const id = Mock.mock('@id');
  if (loginUPwd) {
    responseData = {data: null, status: 300, message: '该用户已存在'};
  } else {
    // 注册保存，更新登录状态
    fs.writeFileSync(
      userInfoPath,
      JSON.stringify({
        ...user_info,
        [name]: {
          pwd: encrypt(password),
          email: email,
          id,
          // 是否是登陆中
          loginStatus: true,
        },
      })
    );
    responseData = {
      data: {token, userInfo: {name, email, id}},
      status: 200,
      message: '注册成功',
    };
  }
  // handleLoginUser(loginUser, {...req.body, id});
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

// 退出接口
userRoute.post('/exit', (req, res) => {
  const {id} = req.body;
  const index = loginUser.findIndex((i) => i.id === id);
  loginUser.splice(index, 1);
  res.json({data: null, status: 200});
});

// 更行个人信息
userRoute.post('/user-update', (req, res) => {
  let user_info = res.locals.user_info || {};
  const form = new multiparty.Form();
  form.parse(req, function (err, fields, file) {
    const data = JSON.parse(fields.result[0]);
    const username = data.username;
    const userData = user_info?.[username];
    let oldImgUrl = '';
    if (!userData) {
      responseData = {
        data: null,
        status: 300,
        message: '用户不存在，系统错误，排查中...',
      };
    } else {
      oldImgUrl = userData?.imageUrl;
      delete user_info[username];
      const resultData = {
        ...userData,
        ...data,
      };
      user_info[data.name] = resultData;
      responseData = {
        data: resultData,
        status: 200,
      };
    }
    if (file?.raw && userData) {
      const [{originalFilename, path: tempPath}] = file.raw;
      // 生成新的文件名
      const newFileName = `${Date.now()}-${originalFilename}`;
      const newFilePath = path.join(__dirname, '../public/images', newFileName);

      // 将临时文件保存到新位置
      const readStream = fs.createReadStream(tempPath);
      const writeStream = fs.createWriteStream(newFilePath);
      console.log(newFilePath, '==newFilePath=');
      readStream.pipe(writeStream);
      writeStream.on('close', () => {
        const imageUrl = `http://localhost:8100/images/${newFileName}`;
        user_info[data.name] = {
          ...data,
          number: data.total,
          id: Mock.mock('@id'),
          imageUrl,
        };
        responseData = {
          data: user_info[data.name],
          status: 200,
        };
        // 删除旧图片
        const imgName = oldImgUrl?.split('/').pop();
        const deleteUrl = path.join(
          __dirname,
          '../public/images',
          imgName ?? 'xxx123.png'
        );
        console.log(deleteUrl, '=deleteUrl=', fs.existsSync(deleteUrl));
        if (fs.existsSync(deleteUrl)) {
          console.log(1);
          fs.unlink(deleteUrl, (err) => {
            if (err) throw err;
            console.log(`更新-已删除文件：${oldImgUrl}`);
          });
        }
        fs.writeFileSync(userInfoPath, JSON.stringify(user_info));
        console.log(22);
        res.json(responseData);
      });
    } else {
      // 更新登录状态
      fs.writeFileSync(userInfoPath, JSON.stringify(user_info));
      res.json(responseData);
    }
  });
});

module.exports = userRoute;
