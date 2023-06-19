export const columns = [
  {
    prop: 'productName',
    label: '产品名称',
    width: 120,
  },
  // {
  //   prop: 'id',
  //   label: '产品ID',
  // },
  {
    prop: 'price',
    label: '产品单价(元)',
  },
  {
    prop: 'name',
    label: '创建人',
    width: 80,
  },
  {
    prop: 'total',
    label: '商品数量',
    width: 120,
  },
  {
    prop: 'number',
    label: '商品剩余数量',
    width: 120,
  },
  {
    prop: 'createTime',
    label: '上传时间',
    width: 160,
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160,
  },
  {
    prop: 'description',
    label: '产品描述',
    tooltip: true,
  },
  {
    prop: 'manage',
    label: '操作',
    width: 100,
    operate: [
      {name: 'edit', text: '编辑'},
      {name: 'delete', text: '删除'},
    ],
  },
];
