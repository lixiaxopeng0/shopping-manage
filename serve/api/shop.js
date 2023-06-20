const express = require('express');
const Mock = require('mockjs');
const dayjs = require('dayjs');
const getClassify = require('../utils/getClassify');
const shopRoute = express.Router();

// 当前时间
const nowMoment = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
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
        'price|1000-3500': 1,
      },
    ],
  }).data;
};
let baseList = [...Array.from({length: 10})].map(() => getItem());
// 列表获取
shopRoute.get('', (req, res) => {
  const {page = 1, pageSize = 10, searchName} = req.query;
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
shopRoute.delete('/:id/delete', (req, res) => {
  const id = req.params.id;
  const index = baseList.findIndex((i) => i.id === id);
  if (index >= 0) {
    baseList.splice(index, 1);
    res.json({data: null, status: 200});
  } else {
    res.json({data: null, status: 300, message: '删除数据不存在'});
  }
});

// 获取详情
shopRoute.get('/:id/detail', (req, res) => {
  const id = req.params.id;
  const index = baseList.findIndex((i) => i.id === id);
  let responseData = {};
  if (index >= 0) {
    responseData = {data: baseList[index], status: 200};
  } else {
    responseData = {data: null, status: 300, message: '数据不存在'};
  }
  res.json(responseData);
});

// 添加信息
shopRoute.post('/add', (req, res) => {
  const data = req.body;
  const index = baseList.findIndex((i) => i.productName === data.productName);
  if (index >= 0) {
    res.json({data: null, status: 300, message: `${data.productName}已存在`});
  } else {
    baseList.unshift({
      ...data,
      number: data.total,
      id: Mock.mock('@id'),
      createTime: nowMoment(),
    });
    res.json({data: null, status: 200});
  }
});

// 更新
shopRoute.post('/update', (req, res) => {
  const data = req.body;
  const index = baseList.findIndex((i) => i.id === data.id);
  let responseData = {};
  if (index >= 0) {
    baseList[index] = {...baseList[index], ...data, updateTime: nowMoment()};
    responseData = {data: null, status: 200};
  } else {
    responseData = {data: null, status: 300, message: '数据不存在'};
  }
  res.json(responseData);
});

// 获取echarts分类数据
shopRoute.get('/classify', (req, res) => {
  // 按productName、name比较好
  const type = req.query?.type;
  const result = getClassify(type);
  res.json({data: result, status: 200});
});

module.exports = shopRoute;
