import axios from 'axios';
import {ElMessage} from 'element-ui';
import store from '@/store';
import router from '@/router';

const instance = axios.create({
  // baseURL: 'http://192.168.0.104:8100/',
  baseURL: '',
  timeout: 5000,
});

// axios请求拦截
instance.interceptors.request.use(
  (config) => {
    // 从store中获取token
    const token = store.state.token;
    // 按照后端的要求拼接token数据
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    if (res.data.status === 400) {
      store.commit('removeToken');
      router.push('/login');
      // 统一错误提示
      ElMessage({
        type: 'warning',
        message: res.data.message,
      });
    }
    if (res.data.status > 200) {
      throw Error(res.data.message);
    }
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
