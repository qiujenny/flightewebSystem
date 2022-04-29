/**
 * By Rick 20190723
 * @description 表格组件跨页勾选数据的公共函数（一般和下面的tableSelectionCheck一起结合用）
 * @param，tableData: 表格数据
 * @param，data: table组件自带的on-selection-change里勾选数据
 * @param，selectedArray: 已勾选的数组（一般是表格数据的ID数组）
 * @param，currentPageSelected: 当前页已勾选数据
 * @param，key: 已勾选的数据集合成数组的标识，一般为ID
 * @param，selectedTableData: 已勾选的数据集合，非必传
 * Remark: 应用于页面：提货码、领货管理
 * */
export const tableSelection = (tableData, data, selectedArray, currentPageSelected, key, selectedTableData = []) => {
  let selectedArr = selectedArray;
  // 全选后全不选
  const isCancelAll = data.length === 0;
  // 勾选后取消勾选
  const isCancel = data.length >= 0 && (currentPageSelected.length > data.length);
  if (isCancel || isCancelAll) {
    // 取消勾选key
    let deleteKey = '';
    currentPageSelected.forEach(item => {
      const hasKey = data.some(i => i[key] === item[key]);
      if (!hasKey) {
        deleteKey = item[key];
        const delIndex = selectedArr.findIndex(key => key === deleteKey);
        selectedArr.splice(delIndex, 1);
        selectedTableData.splice(delIndex, 1);
        const delTableData = tableData.find(item => item[key] === deleteKey);
        if (delTableData) delTableData._checked = false;
      }
    });
  } else {
    // 添加勾选
    data.forEach(item => {
      if (!selectedArr.find(key => key === item[key])) {
        selectedArr.push(item[key]);
      }
      const targetData = tableData.find(list => list[key] === item[key]);
      targetData._checked = true;
    });
    // 去重
    selectedArr = Array.from(new Set(selectedArr));

    // 已选数据
    selectedArr.forEach(id => {
      const item = tableData.find(list => list[key] === id);
      // 一定要排除原已选数据里有的
      const has = selectedTableData.some(list => list[key] === id);
      if (item && !has) selectedTableData.push(item);
    });
  }

  currentPageSelected = [];
  // 不是全选后全不选
  if (!isCancelAll) currentPageSelected = JSON.parse(JSON.stringify(data));

  return { selectedArr, currentPageSelected, selectedTableData };
};

/**
 * By Rick 20190723
 * @description 表格组件跨页勾选数据回显勾选的公共函数（一般和上面的tableSelection一起结合用）
 * @param，tableData: 表格数据
 * @param，selectedArr: 已勾选的数组（一般是表格数据的ID数组）
 * @param，currentPageSelected: 当前页已勾选数据
 * @param，key: 已勾选的数据集合成数组的标识，一般为ID
 * Remark: 应用于页面：提货码、领货管理
 * */
export const tableSelectionCheck = (tableData, selectedArr, currentPageSelected, key) => {
  currentPageSelected = [];
  tableData.forEach(item => {
    const isHas = selectedArr.some(id => id === item[key]);
    if (isHas) {
      item._checked = true;
      currentPageSelected.push(item);
    }
  });
  // const dataString = selectedArr.join(',');
  // tableData.forEach(item => {
  //   const isHas = dataString.indexOf(item[key]);
  //   if (isHas !== -1) {
  //     item._checked = true;
  //     currentPageSelected.push(item);
  //   }
  // });
  return { selectedArr, currentPageSelected, tableData };
};

/**
 * By Rick 20190723
 * @description 根据DatePicker组件时间，格式化时间 yyyy-MM-DD
 * @param，date: 目标处理时间
 * @param，isNeedTime: 需要返回时分秒
 * Remark: 应用于：提货码页面
 * */
export const formatDate = (date, formatType, isNeedTime) => {
  const TYPE = formatType ? '/' : '-';
  const format = (year, month, day) => year + TYPE + (month > 9 ? month : `0${month}`) + TYPE + (day > 9 ? day : `0${day}`);
  const formatTime = (hours, minutes, seconds) => `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  const result = format(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (isNeedTime) {
    // 日期 + 时分秒
    return `${result} ${formatTime(date.getHours(), date.getMinutes(), date.getSeconds())}`;
  }
  return result;
};

/**
 * Rick日期，本月，本周，上个月（主要运用于订单的交易信息，“销售数据”下三级页面N个页面）
 type: 默认情况下是yyyy-MM-dd；运用于DatePicker组件，
 callbackType: 需要处理成什么类型数据，currentMonth本月(默认), currentWeek本周, lastMonth上个月, 30Day最近30天, today今天, yesterday昨天,
 7days前7天（不含今天），30days前30天（不含今天）,
 * */
export const changeDateTool = (callbackType, type = 'yyyy-MM-dd') => {
  Date.prototype.format = function (fmt) {
    const o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+"': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    return fmt;
  };

  const day = new Date();
  const today = day.format(type);
  let yesterday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
  yesterday = yesterday.format(type);

  if (callbackType === 'currentWeek') {
    const num = day.getDay() - 1;
    day.setDate(day.getDate() - num); // 本周第一天
    return [day.format(type), today];
  } else if (callbackType === 'lastMonth') {
    const firstDate = new Date(day.getFullYear(), day.getMonth() - 1, 1);
    const lastDay = new Date(day.getFullYear(), day.getMonth(), 0).getDate();
    const lastDate = new Date(day.getFullYear(), day.getMonth() - 1, lastDay);
    return [firstDate.format(type), lastDate.format(type)];
  } else if (callbackType === '30Day') {
    const preMonth = new Date(day.getFullYear(), day.getMonth() - 1, day.getDate());
    return [preMonth.format(type), today];
  } else if (callbackType === 'today') {
    return [today, today];
  } else if (callbackType === 'yesterday') {
    return [yesterday, yesterday];
  } else if (callbackType === '7days') {
    let before7Day = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7);
    before7Day = before7Day.format(type);
    return [before7Day, yesterday];
  } else if (callbackType === '30days') {
    let before30Day = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 30);
    before30Day = before30Day.format(type);
    return [before30Day, yesterday];
  }
  day.setDate(1); // 本月第一天
  // 默认是本月
  return [day.format(type), today];
};

// Rick防抖函数
let timerMark = null;
export const debounceFn = (fn, delay = 280) => {
  if (timerMark) clearTimeout(timerMark);
  timerMark = setTimeout(fn, delay);
};

// Rick0929 Base64加密 + 解密；用于商户配置小微商户
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
// public method for encoding
export const Base64Encode = val => {
  let output = '';
  let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let 
    enc4;
  let i = 0;
  val = _utf8_encode(val);
  while (i < val.length) {
    chr1 = val.charCodeAt(i++);
    chr2 = val.charCodeAt(i++);
    chr3 = val.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =      output
      + _keyStr.charAt(enc1)
      + _keyStr.charAt(enc2)
      + _keyStr.charAt(enc3)
      + _keyStr.charAt(enc4);
  }
  return output;
};
// public method for decoding
export const Base64Decode = val => {
  let output = '';
  let chr1; let chr2; let 
    chr3;
  let enc1; let enc2; let enc3; let 
    enc4;
  let i = 0;
  val = val.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  while (i < val.length) {
    enc1 = _keyStr.indexOf(val.charAt(i++));
    enc2 = _keyStr.indexOf(val.charAt(i++));
    enc3 = _keyStr.indexOf(val.charAt(i++));
    enc4 = _keyStr.indexOf(val.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }
  output = _utf8_decode(output);
  return output;
};
// private method for UTF-8 encoding
const _utf8_encode = string => {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
};
