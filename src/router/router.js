// 引入vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
import Antd from 'ant-design-vue';
import routersCommon from './routersCommon';
import { baseRouter_path } from '../libs/comment';
import 'ant-design-vue/dist/antd.css';
import { getToken } from '../untils/until';
// 第三方库需要use一下才能用
Vue.use(VueRouter);
Vue.use(Antd);

const LOGIN_PAGE_NAME = 'Login';

// 定义routes路由的集合，数组类型
const routes = [
  // 单个路由均为对象类型，path代表的是路径，component代表组件
  {
    path: `${baseRouter_path}login`,
    name: 'Login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/Login/Index.vue')
  },
  {
    path: `${baseRouter_path}401`,
    name: 'err_401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: `${baseRouter_path}500`,
    name: 'error_500',
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: `${baseRouter_path}404`,
    name: 'error_404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    name: 'default',
    path: '*',
    redirect: {
      name: 'Login'
    }
  },
  ...routersCommon
];

// 实例化VueRouter并将routes添加进去
const router = new VueRouter({ routes, mode: 'history' });

router.beforeEach((to, from, next) => {
  // 验证token

  const token = getToken();
  console.log(to, from, next, token);
  // if (!token && to.name !== LOGIN_PAGE_NAME) {
  //   // 直接访问/autostore/login
  //   console.log(routes, 323, next)
  //   next({ name: LOGIN_PAGE_NAME })
  // } else
  if (to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next();
  } else if (token && to.name === 'error_401') {
    next();
  } else if (token && to.name === 'error_404') {
    next();
  } else {
    next();
  }
});

// 抛出这个这个实例对象方便外部读取以及访问
export default router;
