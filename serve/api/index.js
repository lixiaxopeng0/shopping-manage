const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const jwtToekn = require('../utils/jwtToken');
const userInfoGet = require('../utils/userInfoGet');
const shopListGet = require('../utils/shopListGet');
const shopRoute = require('./shop');
const userRoute = require('./user');
const {staticPath} = require('../dicts');
const {
  deleteOldImage,
  deleteShoppList,
  deleteOldUser,
} = require('../utils/init');

const app = express();
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(staticPath));
app.use(jwtToekn);
app.use(userInfoGet);
app.use(shopListGet);
app.use('/shop-list', shopRoute);
app.use('/user', userRoute);
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

app.listen(8100, () => {
  // 初始化删除所有数据,如果保存请去掉
  deleteOldImage();
  deleteShoppList();
  deleteOldUser();
  console.log('localhost:8100开启服务...');
});
