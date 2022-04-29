import Axios from 'axios';
import { message } from 'ant-design-vue';
// eslint-disable-next-line
import { logOut } from '@/api/user';
import baseURL from '../../config/url';
import localInterface from './localInterface';

const HTTP_LAST_TIME = 'HTTP_LAST_TIME';
const lastTime = sessionStorage.getItem(HTTP_LAST_TIME);
let httpLastTime = lastTime ? Number(lastTime) : new Date().getTime();
function logout(msg) {
  if (msg) message.error(msg);
  setTimeout(() => {
    logOut().then(() => {});
    const DOMAIN = process.env.VUE_APP_DOMAIN;
    const loginPath = `/${DOMAIN}/login`;
    window.location.href = loginPath;
    sessionStorage.clear();
  }, 800);
}
function getTime() {
  return new Date().getTime();
}

class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    };
    // 存储请求队列
    this.queue = {};
  }

  // 销毁请求实例
  destroy(url) {
    delete this.queue[url];
    const queue = Object.keys(this.queue);
    return queue.length;
  }

  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    console.log(url);
    instance.interceptors.request.use(
      config => {
        const isTimeout = sessionStorage.getItem('token') && (getTime() - httpLastTime > 3600000);
        // Rick前后请求相差超过1小时；自动跳转登录
        if (isTimeout) {
          console.log(isTimeout, 'isTimeout');
          logout();
          return false;
        } else {
          httpLastTime = getTime();
          sessionStorage.setItem(HTTP_LAST_TIME, httpLastTime);
        }
        if (!config.url.includes('/users')) {
          config.headers.GKToken = sessionStorage.token;
          config.headers.userName = encodeURI(
            sessionStorage.getItem('loginUserName')
          );
          config.headers.com_id = 1;
        }
        if (config.url.includes('/querySkuByCondition')) {
          config.headers.com_id = 1;
        }
        // RICK用于联调后台接口本地服务
        if (process.env.NODE_ENV === 'development') config.url = localInterface(config.url);
        return config;
      },
      error => Promise.reject(error)
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        const { data } = res;
        if (!(data instanceof Blob)) {
          if (data.code !== 200) {
            if (data.code === 24200 || data.code === 24199) {
              // 20200724应何睿需求，添加token过期或不存在
              logout(data.msg);
            } else {
              console.log(data.msg, 'data.msg');
              if (data.msg) message.error(data.msg);
            }
            return Promise.reject(data);
          }
        }
        return data;
      }
    );
  }

  // 创建实例
  create() {
    const conf = {
      baseURL,
      // headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      // },
      contentType: 'application/json;charset=utf-'
    };
    Axios.defaults.timeout = 1000000;
    return Axios.create(conf);
  }

  // 合并请求实例
  mergeReqest() {
    //
  }

  // 请求实例
  request(options) {
    const instance = this.create();
    this.interceptors(instance, options.url);
    options = { ...options };
    this.queue[options.url] = instance;
    return instance(options);
  }
}

export default httpRequest;
