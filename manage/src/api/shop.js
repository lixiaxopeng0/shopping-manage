import instance from '@/utils/axios-accept';

export default {
  // 获取列表
  getList: (params) => {
    return instance({
      url: '/api/shop-list',
      method: 'get',
      params,
    });
  },
  // 删除数据
  delete: (id) => {
    return instance({
      url: `/api/shop-list/${id}/delete`,
      method: 'DELETE',
    });
  },
  // 新建列表
  post: (data) => {
    return instance({
      url: '/api/shop-list/add',
      method: 'POST',
      data,
    });
  },
  // 更新数据
  update: (data) => {
    return instance({
      url: '/api/shop-list/update',
      method: 'POST',
      data,
      //必须false才会自动加上正确的Content-Type
      contentType: false,
    });
  },
  // 获取详情数据
  detail: (id) => {
    return instance({
      url: `/api/shop-list/${id}/detail`,
      method: 'GET',
    });
  },
  login: (data) => {
    return instance({
      url: '/api/user/login',
      method: 'POST',
      data,
    });
  },
  register: (data) => {
    return instance({
      url: '/api/user/register',
      method: 'POST',
      data,
    });
  },
};
