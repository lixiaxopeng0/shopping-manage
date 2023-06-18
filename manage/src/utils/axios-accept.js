import axios from 'axios';
import {ElMessage} from 'element-ui';

const instance = axios.create({
  // baseURL: 'http://192.168.0.104:8100/',
  baseURL: '',
  timeout: 5000,
});

// axios请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message,
    });
    return Promise.reject(e);
  }
);

// axios相应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (e) => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message,
    });
    return Promise.reject(e);
  }
);

export default instance;
