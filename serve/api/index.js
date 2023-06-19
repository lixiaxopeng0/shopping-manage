const express = require('express');
// const cors = require('cors');
const Mock = require('mockjs');
const fs = require('fs');
const CryptoJS = require("crypto-js");
const bodyParser = require('body-parser');

const getItem = () => {
  return Mock.mock({
    'data|1': [
      {
        name: Mock.mock('@cname'),
        id: Mock.mock('@id'),
        productName: '手机',
        email: Mock.mock('@email'),
        'total|100-150': 1,
        'number|1-100': 1,
        createTime: Mock.mock('@datetime'),
        updateTime: null,
        description: Mock.mock('@cparagraph(1, 3)'),
      },
    ],
  }).data;
};
let baseList = [...Array.from({length: 10})].map(() => getItem());

const app = express();
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

// 密钥
const secretKey = '123#abc-abc#123';
// 加密
const encrypt = (pwd) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(pwd), secretKey).toString();
  return ciphertext;
}
// 解密
// eslint-disable-next-line
const decrypt = (pwd) => {
  const bytes  = CryptoJS.AES.decrypt(pwd, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

// 登录信息
const userInfoPath = './user.json';
let user_info = {};
const manager = {manager: encrypt('123456')};

// 登录
app.post('/login', (req, res) => {
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
app.post('/register', (req, res) => {
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
    fs.writeFileSync(userInfoPath, JSON.stringify({...user_info, [name]: encrypt(password)}));
    responseData = {data: null, status: 200, message: '注册成功'};
  }
  res.json(responseData);
});

// 列表获取
app.get('/shop-list', (req, res) => {
  const {page, pageSize, searchName} = req.query;
  const list = baseList?.filter((i) => {
    return i?.productName?.includes(searchName) || !searchName;
  });
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = list.slice(start, end);
  res.json({
    data,
    total: list.length,
    status: 200,
  });
});
// 列表删除
app.delete('/shop-list/:id/delete', (req, res) => {
  const id = req.params.id;
  const index = baseList.findIndex(i => i.id === id);
  if (index >= 0) {
    baseList.splice(index, 1);
    res.json({data: null, status: 200});
  } else {
    res.json({data: null, status: 300, message: '删除数据不存在'});
  }
});

// 获取详情
app.get('/shop-list/:id/detail', (req, res) => {
  const id = req.params.id;
  const index = baseList.findIndex(i => i.id === id);
  let responseData = {};
  if (index >= 0) {
    responseData = {data: baseList[index], status: 200};
  } else {
    responseData = {data: null, status: 300, message: '数据不存在'};
  }
  res.json(responseData);
});

// 添加信息
app.post('/shop-list/add', (req, res) => {
  const data = req.body;
  const index = baseList.findIndex(i => i.productName === data.productName);
  if (index >= 0) {
    res.json({data: null, status: 300, message: `${data.productName}已存在`});
  } else {
    baseList.push({
      ...data,
      id: Mock.mock('@id'),
    });
    res.json({data: null, status: 200});
  }
});

// 更新
app.post('/shop-list/update', (req, res) => {
  const data = req.body;
  const index = baseList.findIndex(i => i.id === data.id);
  let responseData = {};
  if (index >= 0) {
    baseList[index] = {...baseList[index], data};
    responseData = {data: null, status: 200};
  } else {
    responseData = {data: null, status: 300, message: '数据不存在'};
  }
  res.json(responseData);
});

// 处理classify数据类型，叠加
const getClassify = (type = 'productName') => {
    return baseList.reduce((total, item)=> {
      return {
        ...total,
        [item?.[type]]: {
          // 存在数量
          totalNumber: (total?.[type]?.totalNumber || 0) + (item?.total || 0),
          // 剩余数量
          resetNumber: (total?.[type]?.resetNumber || 0) + (item?.number || 0),
          // 所有产品
          product: [...(item?.[type]?.product || []), item?.productName]
        },
      }
    }, {})
}

// 获取echarts分类数据
app.get('/shop-list/classify', (req, res) => {
  // 按productName、name比较好
  const type = req.query?.type;
  const result = getClassify(type);
  res.json({data: result, status: 200})
});
app.listen(8100, () => {
  console.log('localhost:8100开启服务...');
});
