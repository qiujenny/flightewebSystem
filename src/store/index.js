import Vue from 'vue';
import Vuex from 'vuex';

// import paySettingsApi from '../api/paySettings';
// import { getStationList } from '../api/organization';

// 获取modules
const requireContext = require.context('./module', false, /\.js$/);
const modules = requireContext.keys().reduce((accu, curr) => {
  accu[curr.slice(2, -3)] = requireContext(curr).default;
  return accu;
}, {});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasInventory: false, // 是否拥有“仓储管理”菜单的权限，即判定进销存开关是否开启
    excludeRoute: [],
    paymentType: [], // 支付类型
    serviceStationList: null, // 服务站列表
    pathValueData: JSON.parse(sessionStorage.getItem('pathValueData')) || null, // OP_1024 全部菜单权限
    hasButtonAuthorizedOfMenu: JSON.parse(sessionStorage.getItem('hasButtonAuthorizedOfMenu')) || null, // OP_1024 全部按钮权限
    franchiseesOptions: [], // 加盟商下拉选择数据（用于支付配置）
  },
  mutations: {
    setPayType(state, data) {
      sessionStorage.setItem('payType', data);
      state.paymentType = data;
    },
    setServiceStationList(state, data) {
      state.serviceStationList = data;
    },
    // OP_1024
    setPathValueData(state, data) {
      // 白名单中加入“在线手册”菜单
      data.push('/usermanual', '/usermanualoffranchisee');
      state.pathValueData = data;
      sessionStorage.setItem('pathValueData', JSON.stringify(data));
    },
    // OP_1024
    setHasButtonAuthorizedOfMenu(state, data) {
      state.hasButtonAuthorizedOfMenu = data;
      sessionStorage.setItem('hasButtonAuthorizedOfMenu', JSON.stringify(data));
    },
    setFranchiseesOptions(state, data) {
      sessionStorage.setItem('franchiseesOptions', data);
      state.franchiseesOptions = data;
    },
  },
  actions: {
    // Rick支付类型
    // getFranchiseesOptions({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     if (state.franchiseesOptions.length) {
    //       resolve(state.franchiseesOptions)
    //     } else {
    //       const params = { comName: '', loginStatus: null, joinMode: null, pageSize: 100, pageNum: 0 };
    //       franchiseesApi.getFranchiseesList(params).then(res => {
    //         if (res.code === 200) {
    //           const resData = res.data.reduce((accu, curr) => {
    //             const item = { id: curr.id, comName: curr.comName, comNo: curr.comNo,  };
    //             return [...accu, item];
    //           }, []);
    //           commit('setFranchiseesOptions', resData);
    //           resolve(resData);
    //         }
    //       }).catch(err => reject(err));
    //     }
    //   })
    // },
    // // Rick支付类型
    // getPaymentTypeAction({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     if (state.paymentType.length) {
    //       resolve(state.paymentType);
    //     } else {
    //       paySettingsApi.getPayTypes({ userId: Number(state.user.userId) }).then(res => {
    //         commit('setPayType', res.data);
    //         resolve(res.data);
    //       }).catch(err => reject(err));
    //     }
    //   });
    // },
    // // Rick服务站列表（运用于领货退货）
    // serviceStationListAction({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     // 设为null是以防出现上次响应数据为空[]时，循环去请求接口
    //     if (state.serviceStationList !== null) {
    //       resolve(state.serviceStationList);
    //     } else {
    //       getStationList({
    //         type: '23',
    //         gkToken: sessionStorage.getItem('token')
    //       }).then(res => {
    //         if (res.data) {
    //           commit('setServiceStationList', res.data);
    //           resolve(res.data);
    //         } else {
    //           reject(res);
    //         }
    //       }).catch(err => reject(err));
    //     }
    //   });
    // },
  },
  modules
});
