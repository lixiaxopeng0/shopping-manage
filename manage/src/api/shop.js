import instance from '@/utils/axios-accept';

export default {
  getList: () => {
    return instance({
      url: '/shop-list',
      method: 'get',
    });
  },
};
