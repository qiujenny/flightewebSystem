import Main from '../views/Main/Index.vue';
import { baseRouter_path } from '../libs/comment';
import baseData from './baseData';

export default [
  {
    path: '/',
    name: 'home',
    component: Main,
    meta: {
      title: '首页',
      hide: true,
      notCache: true
    },
    children: [
      {
        path: `${baseRouter_path}home`,
        name: 'home',
        meta: {
          title: '首页',
          hide: true,
          notCache: true
        },
        component: () => import('../views/home/home.vue')
      }
    ]
  },
  {
    path: '/baseData',
    name: 'baseData',
    meta: {
      icon: 'gk-ywcd',
      title: '基础数据'
    },
    component: Main,
    children: [
      baseData
    ]
  },
  {
    path: '/OrderInfo',
    name: 'OrderInfo',
    meta: {
      icon: 'gk-ywcd',
      title: '订舱信息'
    },
    component: Main,
    children: [
      {
        path: `${baseRouter_path}Platform`,
        name: 'Platform',
        meta: {
          icon: 'desktop',
          title: '平台管理',
        },
        component: () => import('@/views/Platform/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}createShop`,
            name: 'createShop',
            meta: {
              title: '创建店铺',
              fatherName: 'Platform',
            },
            component: () => import('@/views/Platform/CreateShop.vue')
          },
          {
            path: `${baseRouter_path}addOrEditShop/:shopId`,
            name: 'addOrEditShop',
            meta: {
              hide: true,
              title: '开店',
              fatherName: 'Platform',
            },
            component: () => import('@/views/Platform/AddOrEditShop.vue')
          },
          {
            path: `${baseRouter_path}shopDetail/:shopId`,
            name: 'shopDetail',
            meta: {
              hide: true,
              title: '分店详情',
              fatherName: 'Platform',
            },
            component: () => import('@/components/Shop/ShopDetail.vue')
          },
          {
            path: `${baseRouter_path}memberShip`,
            name: 'memberShip',
            meta: {
              title: '会员信息',
              fatherName: 'Platform',
            },
            component: () => import('@/views/Platform/MemberShip.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}terminal`,
        name: 'terminal',
        meta: {
          icon: 'user',
          title: '终端管理',
        },
        component: () => import('@/views/Terminal/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}equipment`,
            name: 'equipment',
            meta: {
              title: '终端设备',
              fatherName: 'terminal',
            },
            component: () => import('@/views/Terminal/Equipment.vue'),
          },
          {
            path: `${baseRouter_path}addEqu`,
            name: 'addEqu',
            meta: {
              hide: true,
              title: '新增/编辑设备',
              fatherName: 'terminal',
            },
            component: () => import('@/views/Terminal/AddEqu.vue')
          },
          {
            path: `${baseRouter_path}equInfo`,
            name: 'equInfo',
            meta: {
              hide: true,
              title: '设备详情',
              fatherName: 'terminal',
            },
            component: () => import('@/views/Terminal/EquInfo.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}sales`,
        name: 'sales',
        meta: {
          icon: 'user',
          title: '销售管理',
        },
        component: () => import('@/views/Sales/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}orders`,
            name: 'orders',
            meta: {
              title: '订单管理',
              fatherName: 'sales',
            },
            component: () => import('@/views/Sales/Order.vue'),
          },
          {
            path: `${baseRouter_path}orderDetails`,
            name: 'orderDetails',
            meta: {
              hide: true,
              fatherName: 'sales',
              title: '订单详情',
            },
            component: () => import('@/views/Sales/OrderDetails.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}shop`,
        name: 'shop',
        meta: {
          icon: 'shop',
          title: '店铺管理',
        },
        component: () => import('@/views/Shop/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}shopManagement`,
            name: 'shopManagement',
            meta: {
              title: '店铺管理',
              fatherName: 'shop',
            },
            component: () => import('@/views/Shop/ShopManagement.vue')
          },
          {
            path: `${baseRouter_path}shopSetting/:shopId`,
            name: 'shopSetting',
            meta: {
              hide: true,
              title: '店铺设置',
              fatherName: 'shop',
            },
            component: () => import('@/views/Shop/ShopSetting.vue')
          },
          {
            path: `${baseRouter_path}shopStock`,
            name: 'shopStock',
            meta: {
              title: '店铺进货',
              fatherName: 'shop',
            },
            component: () => import('@/views/Shop/ShopStock.vue')
          },
          {
            path: `${baseRouter_path}goodsManagement/:shopId`,
            name: 'goodsManagement',
            meta: {
              hide: true,
              title: '商品入库',
              fatherName: 'shop',
            },
            component: () => import('@/views/Shop/GoodsManagement.vue')
          }
        ]
      },
      {
        path: `${baseRouter_path}userManagement`,
        name: 'userManagement',
        meta: {
          icon: 'user',
          title: '用户中心',
        },
        component: () => import('@/views/UserManagement/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}users`,
            name: 'users',
            meta: {
              title: '账号管理',
              fatherName: 'userManagement',
            },
            component: () => import('@/views/UserManagement/AccountInfo.vue')
          },
          {
            path: `${baseRouter_path}roles`,
            name: 'roles',
            meta: {
              title: '角色管理',
              fatherName: 'userManagement',
            },
            component: () => import('@/views/UserManagement/RoleInfo.vue')
          },
        ]
      },
    ]
  }
];
