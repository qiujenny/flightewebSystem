import axios from '../libs/api.request';
import base_url from '../../config/url';

/**
 * /orderwhs/autostoreOrder/list
 * 订单列表
 *
 * */
export const orderList = (data) => axios.request({
  url: `${base_url}/orderas/autostoreOrder/list`,
  data,
  method: 'post'
});
  /**
   * /orderwhs/autostoreOrder/export
   * 导出列表
   * */
export const exportList = (data) => axios.request({
  url: `${base_url}/orderas/autostoreOrder/export`,
  data,
  method: 'post',
  responseType: 'blob'
});
  /**
   * /orderwhs/autostoreOrder/detail/{autoOrderId}
   * 订单详情
   * */
export const orderDetail = (autoOrderId) => axios.request({
  url: `${base_url}/orderas/autostoreOrder/detail/${autoOrderId}`,
  method: 'get'
});
/**
   * /sales/wrd/shop/getShopWrdList
   * 分店
   * */
export const shopWrdList = (data) => axios.request({
  url: `${base_url}/sales/wrd/shop/getShopWrdList`,
  data,
  method: 'post'
});
