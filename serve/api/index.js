const express = require('express');
// const cors = require('cors');
const Mock = require('mockjs');

let baseList = Mock.mock({
  'data|34': [
    {
      name: Mock.mock('@cname'),
      id: Mock.mock('@id'),
      productName: '手机',
      email: Mock.mock('@email'),
      'total|100150': 1,
      'number|1-100': 1,
      createTime: Mock.mock('@datetime'),
      updateTime: null,
      description: Mock.mock('@cparagraph(1, 3)'),
    },
  ],
});

const app = express();
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

app.get('/shop-list', (req, res) => {
  console.log();
  const {page, pageSize} = req.query;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = baseList.data.slice(start, end);
  res.json({
    data,
    total: baseList.data.length,
    status: 200,
  });
});

app.listen(8100, () => {
  console.log('localhost:8100开启服务...');
});
