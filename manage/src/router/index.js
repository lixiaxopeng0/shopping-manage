import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Login from '@/views/Login/index.vue';
import MyHome from '@/views/MyHome/index.vue';
import BaseContent from '@/views/BaseContent/index.vue';
import {BASE_URL} from '@/dicts/route';

const ShopList = () => import('@/views/ShopList/index.vue');
const ShopMonitoring = () => import('@/views/ShopMonitoring/index.vue');
const ItemDetail = () => import('@/views/ItemDetail/index.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Layout,
    name: 'Layout',
    redirect: BASE_URL,
    children: [
      {
        path: BASE_URL,
        component: BaseContent,
        name: 'BaseContent',
        redirect: `${BASE_URL}/home`,
        children: [
          {
            path: 'home',
            name: 'MyHome',
            component: MyHome,
          },
          {
            path: 'shop-list',
            name: 'ShopList',
            component: ShopList,
          },
          {
            path: 'shop-monitoring',
            name: 'ShopMonitoring',
            component: ShopMonitoring,
          },
        ],
      },
      {
        path: ':id/detail',
        name: 'ItemDetail',
        component: ItemDetail,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
