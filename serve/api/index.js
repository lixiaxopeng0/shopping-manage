const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const shopRoute = require('./shop');
const userRoute = require('./user');

const app = express();
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/shop-list', shopRoute);
app.use('/user', userRoute);
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

app.listen(8100, () => {
  console.log('localhost:8100开启服务...');
});
