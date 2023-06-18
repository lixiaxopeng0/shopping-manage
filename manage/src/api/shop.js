import instance from '@/utils/axios-accept';

export default {
  getList: (params) => {
    return instance({
      url: '/api/shop-list',
      method: 'get',
      params,
    });
  },
};
