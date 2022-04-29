const mixinCache = {
  methods: {
    // pageName页面的名称，pageRoute页面的路由名，name功能点的名称。OP_1024
    hasAuthorized(pageRoute, name) {
      let checkResult = false;
      let pid = '';
      // const sessionFatherMenu = JSON.parse(sessionStorage.getItem('hasButtonAuthorizedOfMenu'));
      const data = this.$store.state.hasButtonAuthorizedOfMenu;
      if (data) {
        data.forEach(item => {
          // 查找页面路由的pid
          if (item.pathValue === `/${pageRoute}`) {
            pid = item.id;
          }
        });
      } else {
        // 以防手动删除缓存hasButtonAuthorizedOfMenu时，全部按钮功能都为不可见
        return false;
      }
      // const allAuthorizedData = JSON.parse(sessionStorage.getItem('privligeList'));
      const allAuthorizedData = this.$store.state.user.privligeList;
      if (allAuthorizedData && allAuthorizedData.length > 0) {
        if (name) {
          checkResult = allAuthorizedData.some(i => i.pid === pid && i.name === name);
        } else {
          checkResult = allAuthorizedData.some(i => i.pid === pid);
        }
      }
      return checkResult;
    },

    // 页面功能权限函数，根据path；主要用于首页 OP_1024
    hasAuthorizedByPathVal(val) {
      const pathValue = this.$store.state.pathValueData;
      if (pathValue) {
        return pathValue.some(item => item === val);
      }
      // 以防手动删除缓存hasButtonAuthorizedOfMenu时，全部按钮功能都为不可见
      return false;
    },

    /**
     * By Rick 20190620
     * @description，tag访问缓存路由，清缓存路由
     * @param，routeName：路由名
     * @param，isDelCache：1指按钮“保存”后，清除当前页面缓存 + 清除返回的列表页面缓存；isDelCache=0，指按钮“取消”后，只清除当前页面缓存
     * @param，targetRoute：目标路由
     * */
    closeTagDelCache(routeName, isDelCache = 1) {
      const { tagNavList } = this.$store.state.app;
      const CURRENT_ROUTE_NAME = this.$options.name; // 当前组件的name属性
      this.$store.state.app.tagNavList = tagNavList.filter(item => item.name !== CURRENT_ROUTE_NAME);
      this.deleteRouterCache(CURRENT_ROUTE_NAME);
      if (isDelCache === 1) {
        const hasNextRouteOfTag = tagNavList.find(item => item.name === routeName);
        hasNextRouteOfTag && this.deleteRouterCache(routeName);
      }
    },

    // 应用于跨不同父级的链接跳转；比如提货码详情里链接到订单信息0828
    deleteRouteCachBeforeLinkJump(targetRoute, callback) {
      const { tagNavList } = this.$store.state.app;
      const currentRouteIndex = tagNavList.findIndex(item => item.name === targetRoute);
      if (currentRouteIndex === -1) {
        callback();
      } else {
        const { fatherName } = tagNavList[currentRouteIndex].meta;
        this.$store.state.app.tagNavList.splice(currentRouteIndex, 1);
        this.$store.state.excludeRoute.push(targetRoute);
        this.$router.push({ name: fatherName });
        setTimeout(() => callback(), 100); // RickNecessary
      }
    },

    deleteRouterCache(targetRoute) {
      const { excludeRoute } = this.$store.state;
      // 对于已经打开过一次的路由又关了它的tab，再次打开该路由时，对缓存清单excludeRoute进行删除该路由
      if (excludeRoute.length) {
        const deleteIndex = excludeRoute.findIndex(router => router === targetRoute);
        if (deleteIndex !== -1) this.$store.state.excludeRoute.splice(deleteIndex, 1);
      }
      const vnode = this.$vnode;
      const vnodeParent = vnode.parent;
      if (vnode && vnodeParent && vnodeParent.componentInstance && vnodeParent.componentInstance.cache) {
        let deleteKey = 0;
        const { cache } = vnodeParent.componentInstance;
        const { keys } = vnodeParent.componentInstance;
        for (const i in cache) {
          if (cache[i]) {
            const { tag } = cache[i];
            if (tag && tag.indexOf(targetRoute) > -1) {
              const newStr = tag.substr(0, tag.lastIndexOf('-'));
              const index2 = newStr.indexOf('vue-component-');
              deleteKey = newStr.substr(index2 + 14, newStr.length);
            }
          }
        }
        if (deleteKey) {
          if (cache[deleteKey]) {
            if (keys.length) {
              const index = keys.indexOf(deleteKey);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            delete cache[deleteKey];
          }
        }
      }
    }
  }
};
export default mixinCache;
