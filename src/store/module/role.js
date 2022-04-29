import { queryRole,  queryNavTreeByRole } from '../../api/roles';
import {
  changeRoleList,
  changePrivligeList,
  isTreeSelected,
  isTreeSelectedRole
} from '../../libs/tools';

// RickPS：用户所属角色的菜单权限的id，组装成数组E
export const rolePrivilegeChangeToIdArray = sourceData => {
  const idArray = [];
  for (const item of sourceData) {
    idArray.push(item.id);
  }
  return idArray; // [244, 245, 246]
};

// RickPS：所属角色的菜单勾选并禁用
export const filterRolePrivilege = (sourceData, commonPrivilegeOfRole, checkPrivilege) => {
  const data = sourceData;
  for (const item of data) {
    const findIdCheck = checkPrivilege.find(i => i === item.id);
    const findIdDisable = commonPrivilegeOfRole.find(i => i === item.id);
    if (findIdCheck) {
      item.checked = true;
      if (findIdDisable) item.disabled = true;
    } else if (item.children && item.children.length > 0) {
      filterRolePrivilege(item.children, commonPrivilegeOfRole, checkPrivilege);
    }
  }
  return data;
};

export default {
  state: {
    allRoleList: [],
    allPrivligeList: JSON.parse(sessionStorage.getItem('allPrivilegeList')) || [],
    sellectPrivligeIds: [],
    privligeListByRole: JSON.parse(sessionStorage.getItem('privligeListByRole')) || [],
    gkossAllPrivilegeList: JSON.parse(sessionStorage.getItem('gkossAllPrivilegeList')) || [],
  },
  mutations: {
    setAllRoleList(state, list) {
      state.allRoleList = list;
    },
    setAllPrivligeList(state, tree) {
      state.allPrivligeList = tree;
      sessionStorage.setItem('allPrivilegeList', JSON.stringify(tree));
    },
    setPrivligeListByRole(state, tree) {
      state.allPrivligeList = tree;
      sessionStorage.setItem('privligeListByRole', JSON.stringify(tree));
    },
  },
  actions: {
    getqueryRoleList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        queryRole({ gkToken: sessionStorage.getItem('token') })
          .then(res => {
            let arr = changeRoleList(res.data, 'name', 'id');
            if (data) {
              arr = isTreeSelected(arr, data);
            }
            commit('setAllRoleList', arr);
            resolve(arr);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    getFindPrivligeList({ state, commit }, list) {
      return new Promise((resolve, reject) => {
        queryNavTreeByRole()
          .then(res => {
            let treeArr = changePrivligeList(res.data);
            if (list) {
              treeArr = isTreeSelectedRole(treeArr, list);
            }
            commit('setPrivligeListByRole', treeArr);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // RickPS：用户可操作的权限菜单，要将用户所属角色里配的菜单进行勾选并禁用。rolePrivilege：角色的权限菜单，selfPrivilege：用户非角色勾选的菜单【0109】
    getRoleList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        queryRole(data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
