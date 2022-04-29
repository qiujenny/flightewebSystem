import {
  // getMenuByRouter,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute
} from '../../libs/until';
// import { oneOf } from '../../libs/tools';
import routers from '../../router/routersCommon';

export default {
  state: {
    tagNavList: [],
    rootState: ['super_admin', 'admin'],
    currentPageName: '',
    dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    homeRoute: getHomeRoute(routers),
    routers,
    menuList: JSON.parse(sessionStorage.getItem('menuList')) || [],
    messageCount: { all: 0, myTodo: 0, myDo: 0, myAlert: 0, myStart: 0 }
  },
  /* getters: {
    menuList: (state, getters, rootState) =>
      getMenuByRouter(routers, rootState.user.access)
  }, */
  mutations: {
    setMenuList(state, routers) {
      // console.log('state',state)
      // state.menuList = getMenuByRouter(routers, state.rootState);
      state.menuList = routers;
      sessionStorage.setItem('menuList', JSON.stringify(routers));
    },
    setTagNavList(state, list) {
      if (list) {
        state.tagNavList = [...list];
        setTagNavListInLocalstorage([...list]);
      } else {
        state.tagNavList = getTagNavListFromLocalstorage();
      }
    },
    addTag(state, item, type = 'unshift') {
      console.log(state, item, '2323');
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        state.tagNavList.push(item);
        // else state.tagNavList.unshift(item);
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    },
    pageOpenedList(state, get) {
      const openedPage = state.pageOpenedList[get.index];
      if (get.argu) {
        openedPage.argu = get.argu;
      }
      if (get.query) {
        openedPage.query = get.query;
      }
      state.pageOpenedList.splice(get.index, 1, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    // increateTag(state, tagObj) {
    //   if (!oneOf(tagObj.name, state.dontCache)) {
    //     state.cachePage.push(tagObj.name);
    //     localStorage.cachePage = JSON.stringify(state.cachePage);
    //   }
    //   state.pageOpenedList.push(tagObj);
    //   localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    // },
    setCurrentPageName(state, name) {
      state.currentPageName = name;
    },
    setMessageCount(state, countObj) {
      state.messageCount = countObj;
    }
  },
  actions: {
    // 设置菜单list
    handleSetMenuList({ state, commit }) {
      console.log(state);
      commit('setMenuList', routers);
    }
  }
};
