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
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
/* export const canTurnTo = (name, access, routes) => {
  const getHasAccessRouteNames = list => {
    let res = []
    list.forEach(item => {
      if (item.children && item.children.length) {
        res = [].concat(res, getHasAccessRouteNames(item.children))
      } else {
        if (item.meta && item.meta.access) {
          if (hasAccess(access, item)) res.push(item.name)
        } else {
          res.push(item.name)
        }
      }
    })
    return res
  }
  const canTurnToNames = getHasAccessRouteNames(routes)
  return canTurnToNames.indexOf(name) > -1
} */
/* 时间格式转换 yyyy-mm-dd hh:mm-ss */
export const padLeftZero = str => (`00${str}`).substr(str.length);
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (`${date.getFullYear()}`).substr(4 - RegExp.$1.length)
    );
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
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

/* 获取当前日期往前一周的日期，主要用于相关报表的初始列表的默认时间选择 */
export const get7daysPre = date => {
  const preDateArr = [];
  let base = new Date(date).getTime();
  const oneDay = 24 * 3600 * 1000;
  const time = new Date(base);
  const month =    time.getMonth() + 1 < 10
    ? `0${time.getMonth() + 1}`
    : time.getMonth() + 1;
  const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

  preDateArr.push([time.getFullYear(), month, day].join('-'));
  // 遍历输入会包含当天日期，再往前一周，共 8 个日期，按需取值；
  for (let i = 1; i < 8; i++) {
    const now = new Date((base -= oneDay));
    const month =      now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
    preDateArr.push([now.getFullYear(), month, day].join('-'));
  }
  return preDateArr;
};

// 获取当前日期N天前或后日期
export const getDateStr = (AddDayCount, date) => {
  const dd = date || new Date();
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  const y = dd.getFullYear();
  const m =    dd.getMonth() + 1 < 10 ? `0${dd.getMonth() + 1}` : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate(); // 获取当前几号，不足10补0
  return date ? `${y}-${m}-${d}` : `${y}-${m}-01 00:00:00`;
};
