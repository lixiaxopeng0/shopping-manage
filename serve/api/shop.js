const express = require('express');
const Mock = require('mockjs');
const dayjs = require('dayjs');
const multiparty = require('multiparty');
const getClassify = require('../utils/getClassify');
const {shopListInfoPath} = require('../dicts');
const fs = require('fs');
const path = require('path');

const shopRoute = express.Router();

// 当前时间
const nowMoment = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
// 列表获取
shopRoute.get('', (req, res) => {
  const {page = 1, pageSize = 10, searchName, uuid} = req.query;
  const baseList = res.locals.shopList?.[uuid] || [];
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
shopRoute.delete('/:id/:uuid/delete', (req, res) => {
  const {id, uuid} = req.params;
  let shopList = res.locals.shopList;
  let baseList = shopList?.[uuid] || [];
  const index = baseList.findIndex((i) => i.id === id);
  if (index >= 0) {
    baseList.splice(index, 1);
    shopList[uuid] = baseList;
    fs.writeFileSync(shopListInfoPath, JSON.stringify(shopList));
    res.json({data: null, status: 200});
  } else {
    res.json({data: null, status: 300, message: '删除数据不存在'});
  }
});

// 获取详情
shopRoute.get('/:id/:uuid/detail', (req, res) => {
  const {id, uuid} = req.params;
  let baseList = res.locals.shopList?.[uuid] || [];
  const detail = baseList.find((i) => i.id === id);
  let responseData = {};
  if (detail) {
    responseData = {data: detail, status: 200};
  } else {
    responseData = {data: null, status: 300, message: '数据不存在'};
  }
  res.json(responseData);
});

// 添加信息
shopRoute.post('/add', (req, res) => {
  let shopList = res.locals.shopList;
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, file) {
    const data = JSON.parse(fields.result[0]);
    let baseList = shopList?.[data?.uuid] || [];
    const index = baseList.findIndex((i) => i.productName === data.productName);
    if (index >= 0) {
      res.json({data: null, status: 300, message: `${data.productName}已存在`});
    } else {
      const [{originalFilename, path: tempPath}] = file.raw;
      // 生成新的文件名
      const newFileName = `${Date.now()}-${originalFilename}`;
      const newFilePath = path.join(__dirname, '../public/images', newFileName);

      // 将临时文件保存到新位置
      const readStream = fs.createReadStream(tempPath);
      const writeStream = fs.createWriteStream(newFilePath);

      readStream.pipe(writeStream);
      writeStream.on('close', () => {
        const imageUrl = `http://localhost:8100/images/${newFileName}`;
        baseList.unshift({
          ...data,
          number: Mock.mock({
            [`number|1-${data.total}`]: 1,
          }).number,
          id: Mock.mock('@id'),
          createTime: nowMoment(),
          imageUrl,
        });
        shopList[data?.uuid] = baseList;
        fs.writeFileSync(shopListInfoPath, JSON.stringify(shopList));
        res.json({data: null, status: 200});
      });
    }
  });
});

// 更新
shopRoute.post('/update', (req, res) => {
  let shopList = res.locals.shopList;
  const form = new multiparty.Form();
  form.parse(req, function (err, fields, file) {
    const data = JSON.parse(fields.result[0]);
    let baseList = shopList?.[data?.uuid] || [];
    const index = baseList.findIndex((i) => i.id === data.id);
    let oldImgUrl = '';

    let responseData = {};
    if (index >= 0) {
      oldImgUrl = baseList[index]?.imageUrl;
      baseList[index] = {...baseList[index], ...data, updateTime: nowMoment()};
      // fs.unlink(filePath, )
      responseData = {data: null, status: 200};
    } else {
      responseData = {data: null, status: 300, message: '数据不存在'};
    }
    // 是新加文件
    if (file?.raw && index >= 0) {
      const [{originalFilename, path: tempPath}] = file.raw;
      // 生成新的文件名
      const newFileName = `${Date.now()}-${originalFilename}`;
      const newFilePath = path.join(__dirname, '../public/images', newFileName);
      // 将临时文件保存到新位置
      const readStream = fs.createReadStream(tempPath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);

      writeStream.on('close', () => {
        const imageUrl = `http://localhost:8100/images/${newFileName}`;
        baseList[index] = {
          ...baseList[index],
          ...data,
          updateTime: nowMoment(),
          imageUrl,
        };
      });
      // 删除旧图片
      const imgName = oldImgUrl?.split('/').pop();

      const deleteUrl = path.join(
        __dirname,
        '../public/images',
        imgName ?? 'xxx123.png'
      );
      if (fs.existsSync(deleteUrl)) {
        fs.unlink(deleteUrl, (err) => {
          if (err) throw err;
          console.log(`已删除文件：${oldImgUrl}`);
        });
      }
      shopList[data?.uuid] = baseList;
      fs.writeFileSync(shopListInfoPath, JSON.stringify(shopList));
      res.json(responseData);
    } else {
      shopList[data?.uuid] = baseList;
      fs.writeFileSync(shopListInfoPath, JSON.stringify(shopList));
      res.json(responseData);
    }
  });
});

// 获取echarts分类数据
shopRoute.get('/classify', (req, res) => {
  // 按productName、name比较好
  const {type, uuid} = req.query;
  let responseData = {};
  let result = {};
  if (type && uuid) {
    let baseList = res.locals.shopList?.[uuid];
    result = getClassify({type, baseList});
    responseData = {data: result, status: 200};
  } else {
    responseData = {data: {}, status: 300, message: '找不到数据'};
  }
  res.json(responseData);
});

module.exports = shopRoute;
