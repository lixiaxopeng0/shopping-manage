const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jwtToekn = require('../utils/jwtToken');
const shopRoute = require('./shop');
const userRoute = require('./user');

const staticPath = path.join(__dirname, '../public');
const app = express();
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(staticPath));
app.use(jwtToekn);
app.use('/shop-list', shopRoute);
app.use('/user', userRoute);
// app.use(
//   cors({
//     'Access-Control-Allow-Origin': '*',
//     origin: '*',
//   })
// );

app.listen(8100, () => {
  // 不保存图片暂时删除
  const folderPath = path.join(staticPath, './images');
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          console.log(`开启-已删除文件：${filePath}`);
        });
      }
    }
  });
  console.log('localhost:8100开启服务...');
});
