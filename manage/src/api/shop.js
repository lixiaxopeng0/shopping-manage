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
    });
  },
};
