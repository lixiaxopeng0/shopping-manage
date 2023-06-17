const express = require('express');
const cors = require('cors');
const Mock = require('mockjs');

let baseList = Mock.mock({
  'data|2': [
    {
      name: Mock.mock('@cname'),
      id: Mock.mock('@id'),
      productName: '',
      email: Mock.mock('@email'),
      'number|1-100': 1,
      createTime: Mock.mock('@datetime'),
      updateTime: null,
      description: '',
    },
  ],
});

const app = express();
app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
    origin: '*',
  })
);

app.get('/shop-list', (req, res) => {
  res.json({
    ...baseList,
    status: 200,
  });
});

app.listen(8100, () => {
  console.log('localhost:8100开启服务...');
});
