import {
  login,
  loginValidateCode,
  queryUserById,
  queryUser,
  queryUserOrgList,
} from '../../api/user';
import {
  queryRoleByUser
} from '../../api/roles';
import { setToken, getToken, getMenuByRouter } from '../../libs/until';
import { changePrivligeList, toArray } from '../../libs/tools';

export default {
  state: {
    rootState: ['super_admin', 'admin'],
    userName: sessionStorage.getItem('loginUserName') || '', // 用户名字
    userId: sessionStorage.getItem('loginUserId') || null, // 用户id
    token: getToken(),
    phone: sessionStorage.getItem('phone') || '', // 用户电话
    loginName: sessionStorage.getItem('loginName') || '', // 用户登录名
    orgList: [], // 当前数所组织信息（可能有多个，如果改用户是服务站的，那么这里就是服务站信息）
    orgListNew: JSON.parse(sessionStorage.getItem('orgListNew')) || [], // 用于新增采购单purchaseManagementEApply和右上角帐户信息
    privligeList: JSON.parse(sessionStorage.getItem('privligeList')) || [],
    roleList: JSON.parse(sessionStorage.getItem('roleList')) || [],
    userMenuList: JSON.parse(sessionStorage.getItem('userMenuList')) || [], // 记录当前用户有权限的菜单
    employeeNo: sessionStorage.getItem('employeeNo'),
  },
  mutations: {
    setUserId(state, id) {
      sessionStorage.setItem('loginUserId', id);
      state.userId = id;
    },
    setUserName(state, name) {
      state.userName = name;
      sessionStorage.setItem('loginUserName', name);
    },
    setPhone(state, phone) {
      state.userName = name;
      sessionStorage.setItem('phone', phone);
    },
    access(state, access) {
      state.access = access;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setLoginName(state, loginName) {
      state.loginName = loginName;
      sessionStorage.setItem('loginName', loginName);
    },
    setPrivligeList(state, privligeList) {
      sessionStorage.setItem('privligeList', JSON.stringify(privligeList));
      state.privligeList = privligeList;
    },
    setUserMenuList(state, data) {
      // state.userMenuList = getMenuByRouter(data, state.rootState);
      // sessionStorage.setItem('userMenuList', JSON.stringify(data));
      // R_F以上两行是加盟商之前
      // const dataNew = state.comId === null ? filterAdminRouters() : getMenuByRouter(data, state.rootState);
      const dataNew = getMenuByRouter(data, state.rootState);
      // const dataNew = getMenuByRouter(data, state.rootState); // 为了切换非加盟商环境时，暂时取消上面行
      state.userMenuList = dataNew;
      sessionStorage.setItem('userMenuList', JSON.stringify(dataNew));
    },
  },
  actions: {
    // 登录
    handleLogin({ state, commit }, payload) {
      console.log(state);
      return new Promise((resolve, reject) => {
        login(payload)
          .then(res => {
            const { data } = res;
            commit('setToken', data.GKToken);
            commit('setUserName', data.trueName);
            commit('setUserId', data.staffId);
            commit('setPhone', data.phone);
            commit('setLoginName', data.LoginName);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        // 登入后添加的信息当前用户的账号信息
        queryUserById(state.userId).then(res => {
          const { data } = res;
          if (data.roles) {
            const idList = [];
            data.roles.map(item => idList.push(item.id));
            // 超级管理员判断系统管理员id永远是1
            const status = idList.includes(1);
            if (status) {
              sessionStorage.setItem('admin', 'super');
            }
          }
          state.employeeNo = res.data.userInfo.workno;
          sessionStorage.setItem('employeeNo', res.data.userInfo.workno);
          resolve(data);
        });
      });
    },

    // RickPS：登录后接口优化【0123】原queryUserBaseByToken接口里orgList的字段数据
    getQueryUserOrgList({ state }) {
      return new Promise((resolve, reject) => {
        queryUserOrgList().then(res => {
          if (!res.data || res.data.length === 0) reject();
          // commit("setOrgList", res.data);
          state.orgListNew = res.data;
          sessionStorage.setItem('orgListNew', JSON.stringify(res.data));
          resolve(res.data);
        })
          .catch(err => {
            reject(err);
          });
      });
    },

    queryRoleByUser({ state, commit }) {
      // 登入后获取用户所有权限
      return new Promise((resolve, reject) => {
        queryRoleByUser({ staffId: state.userId })
          .then(res => {
            if (res.data) {
              const privligeListArr = toArray(res.data);
              console.log(privligeListArr, 'privligeListArr');
              commit('setPrivligeList', privligeListArr);
              resolve(privligeListArr);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取验证码
    getLoginValidateCode() {
      return new Promise((resolve, reject) => {
        loginValidateCode()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取用户列表
    getQueryUser({ state }, data) {
      console.log(state);
      return new Promise((resolve, reject) => {
        queryUser(data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  }
};
