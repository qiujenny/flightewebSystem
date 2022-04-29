// RickPS：获取当前页面全部权限函数，且判断功能点是否存在
export default {
  install(Vue, options) {
    // pageName页面的名称，pageRoute页面的路由名，name功能点的名称。
    Vue.prototype.hasAuthorized = function (pageRoute, name) {
      let value = false;
      let pid = '';
      const allAuthorizedData = JSON.parse(sessionStorage.getItem('privligeList'));
      const sessionFatherMenu = sessionStorage.getItem('hasButtonAuthorizedOfMenu');
      if (sessionFatherMenu) {
        for (const item of JSON.parse(sessionFatherMenu)) {
          // 查找页面路由的pid
          if (item.pathValue === `/${pageRoute}`) {
            pid = item.id;
          }
        }
      } else {
        // 以防手动删除缓存hasButtonAuthorizedOfMenu时，全部按钮功能都为不可见
        return false;
      }

      if (allAuthorizedData && allAuthorizedData.length > 0) {
        if (name) {
          value = allAuthorizedData.some(i => i.pid === pid && i.name === name);
        } else {
          value = allAuthorizedData.some(i => i.pid === pid);
        }
      }
      return value;
    };

    Vue.prototype.authorizedFn = function (authorizedArr, pathName) {
      return authorizedArr.reduce((accumulate, currentVal) => {
        const obj = {};
        obj[currentVal] = Vue.prototype.hasAuthorized(pathName, currentVal);
        return { ...accumulate, ...obj };
      }, {});
    };
  }
};
