const CryptoJS = require('crypto-js');

// 密钥
const secretKey = '123#abc-abc#123';
// 加密
const encrypt = (pwd) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(pwd),
    secretKey
  ).toString();
  return ciphertext;
};
// 解密
// eslint-disable-next-line
const decrypt = (pwd) => {
  const bytes = CryptoJS.AES.decrypt(pwd, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

module.exports = {
    // 密钥
    secretKey,
    // 解密
    decrypt,
    // 加密
    encrypt,
}