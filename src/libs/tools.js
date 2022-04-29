export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  const len = arr.length;
  while (++i < len) {
    const item = arr[i];
    fn(item, i, arr);
  }
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => target.some(_ => arr.indexOf(_) > -1);

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  const len = Math.min(arr1.length, arr2.length);
  let i = -1;
  const res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp);
  return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => timeStamp < currentTime;

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => (num < 10 ? `0${num}` : num);

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = '';
  if (startType === 'year') {
    resStr =      `${year
    }-${
      month
    }-${
      date
    } ${
      hours
    }:${
      minutes
    }:${
      second}`; 
  } else resStr = `${month}-${date} ${hours}:${minutes}`;
  return resStr;
};

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp);
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor((timeStamp /= 1000));
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp);
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000);
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime);
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp;
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff;
  let resStr = '';
  const dirStr = IS_EARLY ? '前' : '后';
  // 少于等于59秒
  if (diff <= 59) resStr = `${diff}秒${dirStr}`;
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = `${Math.floor(diff / 60)}分钟${dirStr}`;
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = `${Math.floor(diff / 3600)}小时${dirStr}`;
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = `${Math.floor(diff / 86400)}天${dirStr}`;
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp);
  else resStr = getDate(timeStamp, 'year');
  return resStr;
};

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = exp => ua.indexOf(exp) > -1;
  if (isExplorer('MSIE')) return 'IE';
  else if (isExplorer('Firefox')) return 'Firefox';
  else if (isExplorer('Chrome')) return 'Chrome';
  else if (isExplorer('Opera')) return 'Opera';
  else if (isExplorer('Safari')) return 'Safari';
};

/**
 *  组织树专用 规范数据
 *
 * */
export const rebuildTreeSelectData = (tree) => {
  const data = tree;
  const treeArr = [];
  for (const i in data) {
    const v = data[i];
    const node = {};
    if (v === null || v === undefined) {

    } else if (v.childList && v.childList.length > 0) {
      node.id = v.id;
      node.label = v.name;
      node.treeCode = v.treeCode;
      node.orgStatus = v.orgStatus;
      node.children = rebuildTreeSelectData(v.childList);
      treeArr.push(node);
    } else {
      node.id = v.id;
      node.label = v.name;
      node.treeCode = v.treeCode;
      node.orgStatus = v.orgStatus;
      treeArr.push(node);
    }
  }
  return treeArr;
};
export const expArrTree = (arr) => {
  const data = arr;
  const treeArr = [];
  for (const j in data) {
    treeArr.push(data[j][0]);
  }
  return rebuildTreeSelectData(treeArr);
};

// 账户页面专用
export const rebuildTreeSelectDataAccount = (tree) => {
  if (tree.length > 0) {
    const mapObj = {
      name: 'title',
      childList: 'children',
    };
    let data = JSON.stringify(tree).replace(/childList|name/gi, matched => mapObj[matched]);
    // 去掉这里不要
    data = data.replace(/"children":\[\],/gi, '');
    return JSON.parse(data);
  }
};
/**
 * */
/* 导出下载文档流转码 */
export const downloadExcel = (data, filename, type) => {
  if (!data) {
    return;
  }
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  if (type) {
    link.setAttribute('download', `${filename}.xlsx`);
  } else {
    link.setAttribute('download', `${filename}.xls`);
  }
  document.body.appendChild(link);
  link.click();
};

/**
 * */
/* 导出下载pdf文档流转码 */
export const downloadPdf = (data, filename) => {
  if (!data) {
    return;
  }
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${filename}.pdf`);
  document.body.appendChild(link);
  link.click();
};

export const changeRoleList = (options, keyVal, keyId) => {
  const data = options.filter(p => p.status === 1);
  const arr = [];
  for (const i in data) {
    const node = {};
    node.id = data[i][keyId];
    node.title = data[i][keyVal];
    arr.push(node);
  }
  return arr;
};
/**
 * 权限树处理数据
 * */
export const rebuildPrivligeTreeData = (tree) => {
  const data = tree;
  const treeArr = [];
  for (const i in data) {
    const v = data[i];
    const node = {};
    if (v === null || v === undefined) {

    } else if (v.childList && v.childList.length > 0) {
      node.id = v.id;
      node.title = v.name;
      node.name = v.name;
      node.pathValue = v.pathValue;
      node.type = v.type;
      node.pid = v.pid;
      node.key = v.id;
      node.children = rebuildPrivligeTreeData(v.childList);
      treeArr.push(node);
    } else {
      node.id = v.id;
      node.title = v.name;
      node.name = v.name;
      node.pathValue = v.pathValue;
      node.type = v.type;
      node.pid = v.pid;
      node.key = v.id;
      treeArr.push(node);
    }
  }
  return treeArr;
};
export const changePrivligeList = (data) => {
  const treeArr = rebuildPrivligeTreeData(data);
  return treeArr;
};

export const rebuildOtherTree = (tree) => {
  const data = tree;
  const treeArr = [];
  for (const i in data) {
    const v = data[i];
    const node = {};
    if (v === null || v === undefined) {

    } else if (v.children && v.children.length > 0) {
      node.id = v.id;
      node.title = v.label;
      node.treeCode = v.treeCode;
      node.children = rebuildOtherTree(v.children);
      treeArr.push(node);
    } else {
      node.id = v.id;
      node.title = v.label;
      node.treeCode = v.treeCode;
      treeArr.push(node);
    }
  }
  return treeArr;
};
export const rebuildPointTree = (tree, level) => {
  const data = tree;
  const  treeArr = [];
  for (const i in data) {
    const v = data[i];
    const node = {};
    
    if (v === null || v === undefined) {

    } else if (v.childList && v.childList.length > 0) {
      if (v.enable === 1) {
        node.id = v.partner_type_id;
        node.label = v.partner_type_name;
        node.level = level + 1;
        node.children = rebuildPointTree(v.childList, node.level);
        treeArr.push(node);
      }
    } else {
      node.level = level + 1;
      node.id = v.partner_type_id;
      node.label = v.partner_type_name;
      treeArr.push(node);
    }
  }
  return treeArr;
};

/**
 *
 * 组织机构搜索框下拉选择
 */
export const rebuildSearchOrganization = (tree) => {
  if (tree.length > 0) {
    const mapObj = {
      childList: 'children',
      name: 'label',
    };
    let data = JSON.stringify(tree).replace(/childList|name/gi, matched => mapObj[matched]);
    // 去掉这里不要
    data = data.replace(/"children":\[\],/gi, '');
    return JSON.parse(data);
  }
};
/**
 *
 * 组织树展示
 *
 *
 *
 address: "广州市天河区高唐路228号广电银通大楼"
 childList: []
 code: "00"
 deleted: "N"
 email: ""
 employeeNo: ""
 fax: "20"
 id: 1
 masterMan: ""
 name: "广州广电银通"
 orgStatus: "2"
 phone: "4007002468"
 pid: 0
 remark: ""
 treeCode: "001"
 type: "01"
 * */
export const rebuildPrivligeTreeDataOne = (tree, expandList) => {
  const data = tree;
  const treeArr = [];
  for (const i in data) {
    const v = data[i];
    const node = {};
    if (v === null || v === undefined) {

    } else if (v.childList && v.childList.length > 0) {
      // console.log(v)
      node.pid = v.pid;
      node.id = v.id;
      node.title = v.name;
      expandList && expandList.includes(v.id) ? node.expand = true : node.expand = false;
      node.orgStatus = v.orgStatus;
      node.code = v.code;
      node.masterMan = v.masterMan;
      node.employeeNo = v.employeeNo;
      node.fax = v.fax;
      node.email = v.email;
      node.phone = v.phone;
      node.address = v.address;
      node.remark = v.remark;
      node.isSaleArea = v.isSaleArea;
      node.type = v.type;
      node.treeCode = v.treeCode;
      node.children = rebuildPrivligeTreeDataOne(v.childList, expandList);
      treeArr.push(node);
    } else {
      node.pid = v.pid;
      node.id = v.id;
      expandList && expandList.includes(v.id) ? node.expand = true : node.expand = false;
      node.title = v.name;
      node.orgStatus = v.orgStatus;
      node.code = v.code;
      node.masterMan = v.masterMan;
      node.employeeNo = v.employeeNo;
      node.fax = v.fax;
      node.email = v.email;
      node.phone = v.phone;
      node.address = v.address;
      node.remark = v.remark;
      node.isSaleArea = v.isSaleArea;
      node.treeCode = v.treeCode;
      node.type = v.type;
      treeArr.push(node);
    }
  }
  return treeArr;
};

/**
 * 转换为二维数组
 * @param nodes
 * @param parentId
 * @returns {Array}
 */
export const toArray = (nodes, parentId = undefined) => {
  if (!nodes) return [];
  const childKey = 'childList';
  let r = [];
  if (nodes instanceof Array) {
    for (const item of nodes) {
      const node = {};
      for (const key in item) {
        if (key !== childKey) {
          node[key] = item[key];
        }
      }
      node.parent = parentId;
      r.push(node);
      if (item[childKey]) {
        r = r.concat(toArray(item[childKey], item.id));
      }
    }
  } else {
    r.push(nodes);
    if (nodes[childKey]) {
      r = r.concat(toArray(nodes[childKey]));
    }
  }
  return r;
};
/*
 * 转换为树状结构
 * @param data
 * @param parent_id
 * @returns {Array}
 */
// 线性数据转化为树。
export const toTree = (data, parent_id) => {
  const tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === parent_id || typeof data[i].parent === 'undefined') {
      const obj = data[i];
      temp = toTree(data, data[i].id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
};
/**
 * 权限控制
 * */
export const canTrunTo = (path, privligeList) => {
  if (privligeList) {
    // name: "项目管理"
    // pathValue: "/projectManagement"
    // const hasPri = privligeList.find(p =>
    //     p.pathValue.substr(1) === path);
    let data = null;
    for (const i in privligeList) {
      if (privligeList[i].pathValue && privligeList[i].pathValue !== '') {
        const str = privligeList[i].pathValue.substr(1);
        if (str) {
          if (path.indexOf(str) === 0) {
            data = privligeList[i];
          }
        }
      } else {

      }
      // if(privligeList[i].pathValue!==""&&path===str||privligeList[i].pathValue!==""&&path.indexOf(str)===0) {
      //     data = privligeList[i]
      // }
    }
    // const test = privligeList.find(p =>
    //     path.indexOf(p.pathValue.substr(1))===0)
    // console.log(data,path,'===')
    const isok = !!(data && data.pathValue);
    if (isok) {
      const inPageCtrl = privligeList.filter(i => i.pid === data.id);
      return { data: inPageCtrl, show: true };
    } else {
      return false;
    }
  } else {
    return false;
  }
};
/**
 * 树 selected
 * */
/**
 * select tree
 * */
export const selectedTreeData = (tree, id) => {
  const data = tree;
  for (const i in data) {
    // data[i].checked = false;
    if (data[i].id === id) {
      if (data[i].children) {
        selectedTreeData(data[i].children, id);
      } else {
        data[i].checked = true;
      }
    } else {
      // tree[i].stretch = false;
      selectedTreeData(data[i].children, id);
    }
  }
  return data;
};
export const isTreeSelected = (tree, selectedDatas) => {
  let treeArr = tree;
  // let seleArr = []
  for (const i in selectedDatas) {
    treeArr = selectedTreeData(treeArr, selectedDatas[i].id);
  }
  return treeArr;
};
// Jenny角色管理权限当菜单有增删时权限回显bug修复
/**
 * 树 selected
 * */
/**
 * select tree
 * */
export const selectedTreeDataRole = (tree, id) => {
  const data = tree;
  for (const i in data) {
    if (data[i].id === id) {
      if (data[i].children) {
        selectedTreeDataRole(data[i].children, id);
      } else {
        data[i].checked = true;
      }
    } else {
      selectedTreeDataRole(data[i].children, id);
    }
  }
  return data;
};
export const isTreeSelectedRole = (tree, selectedDatas) => {
  let treeArr = tree;
  for (let i = 0; i < selectedDatas.length; i++) treeArr = selectedTreeDataRole(treeArr, selectedDatas[i]);
  return treeArr;
};

export const closePointTreeData = (tree, id) => {
  const data = tree;
  for (const i in data) {
    if (tree[i].partner_type_id === id) {
      tree[i].stretch = false;
    } else {
      // closePointTreeData(tree[i],id)
    }
  }
  return data;
};

/**
 * 字符串去重
 * */
export const setNewStr = (str) => {
  let data = str.split(',');
  const set = new Set(data);
  const newArr = Array.from(set);
  const arrTest = newArr.filter(p => p !== '');
  console.log(arrTest);
  data = newArr.join(',');
  return data;
};

/**
 * tree 转换成 数组
 *
 * */
export const treeChangeList = (tree) => {
  const data = tree;
  const arr = [];
  for (const i in data) {
    const v = data[i];
    if (v === null || v === undefined) {
    } else {
      const removeChild = {};
      removeChild.id = v.id;
      removeChild.label = v.label;
      removeChild.name = v.name;
      arr.push(removeChild);
      if (v.children && v.children.length > 0) {
        const child = treeChangeList(v.children);
        child.map(p => { arr.push(p); });
      }
    }
  }
  return arr;
};
