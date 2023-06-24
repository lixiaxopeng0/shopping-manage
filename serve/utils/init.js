const fs = require('fs');
const path = require('path');
const {imagesPath, userInfoPath, shopListInfoPath} = require('../dicts');

const deleteOldImage = () => {
  fs.readdir(imagesPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = path.join(imagesPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          console.log(`init-图片-已删除文件：${filePath}`);
        });
      }
    }
  });
};

const deleteOldUser = () => {
  if (fs.existsSync(shopListInfoPath)) {
    fs.unlink(shopListInfoPath, (err) => {
      if (err) throw err;
      console.log(`init-用户(图表)-已删除文件：${shopListInfoPath}`);
    });
  }
};

const deleteShoppList = () => {
  if (fs.existsSync(userInfoPath)) {
    fs.unlink(userInfoPath, (err) => {
      if (err) throw err;
      console.log(`init-用户-已删除文件：${userInfoPath}`);
    });
  }
};
module.exports = {
  deleteOldImage,
  deleteOldUser,
  deleteShoppList,
};
