/*
 * @Autor: nvzhen.qiu
 * @Date: 2021-04-29 11:19:09
 * @LastEditors: nvzhen.qiu
 * @LastEditTime: 2022-04-29 15:19:13
 * @Description: 
 */
import baseData from '../views/baseData/baseData';
import { baseRouter_path } from '../libs/comment';

export const baseDataCommonRoute = [
  {
    path: `${baseRouter_path}goodsInfo`,
    name: 'goodsInfo',
    meta: {
      title: '商品信息',
      fatherName: 'baseData',
    },
    component: () => import('../views/baseData/goodsInfo.vue')
  }
];

export default {
  path: '/baseData',
  name: 'baseData',
  meta: {
    icon: 'gk-spgl',
    title: '商品管理'
  },
  component: baseData,
  children: [
    ...baseDataCommonRoute
  ]
};
