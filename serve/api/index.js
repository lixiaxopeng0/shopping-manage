const express = require('express');
// const cors = require('cors');
const Mock = require('mockjs');

const getItem = () => {
  return Mock.mock({
    'data|1': [
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
  }).data;
};
let baseList = [...Array.from({length: 10})].map(() => getItem());

const app = express();
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

app.get('/shop-list', (req, res) => {
  const {page, pageSize, searchName} = req.query;
  const list = baseList.filter((i) => {
    return i?.productName.includes(searchName) || !searchName;
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
app.delete('/shop-list/:id/delete', (req, res) => {
  const id = req.params.id;
  baseList = baseList.filter((i) => i.id !== id);
  res.json({data: null, status: 200});
});
app.listen(8100, () => {
  console.log('localhost:8100开启服务...');
});
