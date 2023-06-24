// 处理classify数据类型，叠加
const getClassify = ({baseList, type = 'productName'}) => {
  return baseList?.reduce((total, item) => {
    return {
      ...total,
      [item?.[type]]: {
        // 存在数量
        totalNumber: (total?.[type]?.totalNumber || 0) + (item?.total || 0),
        // 剩余数量
        resetNumber: (total?.[type]?.resetNumber || 0) + (item?.number || 0),
        // 所有产品
        product: [...(item?.[type]?.product || []), item?.productName],
      },
    };
  }, {});
};

module.exports = getClassify;
