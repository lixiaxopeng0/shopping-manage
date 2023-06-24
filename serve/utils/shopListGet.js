const fs = require('fs');
const {shopListInfoPath} = require('../dicts');

// const Mock = require('mockjs');
// const getItem = () => {
//   return Mock.mock({
//     'data|1': [
//       {
//         name: Mock.mock('@cname'),
//         id: Mock.mock('@id'),
//         productName: '手机',
//         email: Mock.mock('@email'),
//         'total|100-150': 1,
//         'number|1-100': 1,
//         createTime: Mock.mock('@datetime'),
//         updateTime: null,
//         description: Mock.mock('@cparagraph(1, 3)'),
//         'price|1000-3500': 1,
//       },
//     ],
//   }).data;
// };
// let baseList = [...Array.from({length: 10})].map(() => getItem());
const shopListGet = (req, res, next) => {
  const url = req.url || req.originalUrl;
  if (url.startsWith('/shop-list')) {
    if (!fs.existsSync(shopListInfoPath) && url.startsWith('/shop-list?')) {
      fs.writeFileSync(shopListInfoPath, JSON.stringify({}));
    }
    const data = fs.readFileSync(shopListInfoPath, 'utf-8');
    shopList = JSON.parse(data) || {};
    res.locals.shopList = shopList;
  }
  next();
};

module.exports = shopListGet;
