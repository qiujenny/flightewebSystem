// Rick，为了开发联调，将接口服务指向后台接口本机服务
function gatewayFn(configUrl, localUrl, gateway) {
  const index = configUrl.indexOf(gateway);
  return index > -1
    ? localUrl + configUrl.slice(index - 1 + gateway.length)
    : configUrl;
}
const localInterface = (configUrl) => {
  const url = configUrl;
  // url = gatewayFn(configUrl, 'http://10.1.13.105:8031', '/orderwhs/');
  // // 第二个时
  // if (url === configUrl) {
  //   url = gatewayFn(configUrl, 'http://10.1.13.77:8014', '/goods/');
  // }
  // if (url === configUrl) {
  //   url = gatewayFn(configUrl, 'http://10.1.13.74:8034', '/userent/');
  // }
  // if (url === configUrl) {
  //   url = gatewayFn(configUrl, 'http://10.1.13.77:8019', '/sales/');
  // }
  // if (url === configUrl) {
  //   url = gatewayFn(configUrl, 'http://10.1.13.77:8015', '/wms/');
  // }
  // 指定某个接口重定向到后端大佬本地接口
  // if (url.indexOf('getShopByPpid') !== -1) {
  //   url = 'http://10.1.132.134:8019/ignoreToken/getShopByPpid';
  // }
  return url;
};

export default localInterface;
