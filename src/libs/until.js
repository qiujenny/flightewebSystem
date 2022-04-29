import { forEach, hasOneOf } from './tools';

export const setToken = token => {
  sessionStorage.token = token;
};
export const getToken = () => {
  const { token } = sessionStorage;
  if (token) return token;
  else return false;
};
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&');
  const paramObj = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split('=');
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};
/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access);
  else return true;
};
/**
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const getHasAccessRouteNames = list => {
    let res = [];
    list.forEach(item => {
      if (item.children && item.children.length) {
        res = [].concat(res, getHasAccessRouteNames(item.children));
      } else if (item.meta && item.meta.access) {
        if (hasAccess(access, item)) res.push(item.name);
      } else {
        res.push(item.name);
      }
    });
    return res;
  };
  const canTurnToNames = getHasAccessRouteNames(routes);
  return canTurnToNames.indexOf(name) > -1;
};

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const hasChild = item => item.children && item.children.length !== 0;
const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true;
    else return false;
  } else return true;
};
export const getMenuByRouter = (list, access) => {
  const res = [];
  forEach(list, item => {
    console.log(item, 'list');
    if (item.meta && !item.meta.hide) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      };
      if (hasChild(item) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access);
      }
      if (item.meta.href) obj.href = item.meta.href;
      if (showThisMenuEle(item, access)) res.push(obj);
    }
  });
  return res;
};
/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  sessionStorage.tagNaveList = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = sessionStorage.tagNaveList;
  return list ? JSON.parse(list) : [];
};
/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute;
  const newList = [...list];
  if (newList.findIndex(item => item.name === name) >= 0) return newList;
  else newList.push({ name, path, meta });
  return newList;
};
/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextName = (list, name) => {
  let res = '';
  if (list.length === 2) {
    res = 'home';
  } else if (list.findIndex(item => item.name === name) === list.length - 1) res = list[list.length - 2].name;
  else res = list[list.findIndex(item => item.name === name) + 1].name;
  return res;
};
export const showTitle = (item) =>
  (item.meta && item.meta.title) || item.name;
/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1;
  const len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    const item = routers[i];
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children);
      if (res.name) return res;
    } else if (item.name === 'home') homeRoute = item;
  }
  return homeRoute;
};
/**
 *
 * */
export const openNewPage = (vm, name, argu, query) => {
  const { pageOpenedList } = vm.$store.state.app;
  const openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu,
        query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagNavList.filter(item => {
      if (item.children) {
        return name === item.children[0].name;
      } else {
        return name === item.name;
      }
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};

/* 时间格式转换 yyyy-mm-dd hh:mm-ss */
export const padLeftZero = (str) => (`00${str}`).substr(str.length);
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  // 遍历这个对象
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // console.log(`${k}`)
      // console.log(RegExp.$1)
      const str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

export const mapToArray = (map) => {
  const list = [];
  for (const key in map) {
    const obj = {
      id: key,
      name: map[key]
    };
    list.push(obj);
  }
  return list;
};

// /* 获取当前日期往前一周的日期，主要用于相关报表的初始列表的默认时间选择 */
// export const get7daysPre = (date) => {
//   const preDateArr = [];
//   let base = new Date(date).getTime();
//   const oneDay = 24 * 3600 * 1000;
//   const time = new Date(base);
//   const month = (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
//   const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
//
//   preDateArr.push([time.getFullYear(), month, day].join('-'));
//   // 遍历输入会包含当天日期，再往前一周，共 8 个日期，按需取值；
//   for (let i = 1; i < 8; i++) {
//     const now = new Date(base -= oneDay);
//     const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
//     const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
//     preDateArr.push([now.getFullYear(), month, day].join('-'));
//   }
//   return preDateArr;
// };
