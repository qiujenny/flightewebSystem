// RickPS：页面功能权限函数
export default {
  install(Vue, options) {
    Vue.prototype.hasAuthorizedByPathVal = function (val) {
      // if (process.env.NODE_ENV === 'development') { return true; }
      const privilegeData = JSON.parse(sessionStorage.getItem('privligeList'));
      if (privilegeData && privilegeData.length > 0) {
        return privilegeData.some(item => item.pathValue === val);
      }
      // 以防手动删除缓存hasButtonAuthorizedOfMenu时，全部按钮功能都为不可见
      return false;
    };
  }
};
