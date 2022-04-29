/*
 * @Autor: nvzhen.qiu
 * @Date: 2021-04-29 11:19:05
 * @LastEditors: nvzhen.qiu
 * @LastEditTime: 2022-03-09 14:40:47
 * @Description: 
 */
let BASE_URL = 'http://dev1.grgfast.com.cn:8001';
if (process.env.NODE_ENV !== 'development') {
  const { origin } = window.location;
  let PORT = ':8001';
  if (origin.indexOf('https://') !== -1) {
    PORT = ':9443';
  } else if (origin.indexOf('d.grgfast.cn') !== -1 || origin.indexOf('v.grgfast.cn') !== -1) {
    PORT = ':81';
  }
  BASE_URL = origin + PORT;
  // if (origin.indexOf('dev3') !== -1) {
  //   BASE_URL = 'http://dev2.grgfast.com.cn:8001';
  // }
}
sessionStorage.setItem('baseUrl', BASE_URL);

export default sessionStorage.getItem('baseUrl');
