import axios from '../libs/api.request';
import base_url from '../../config/url';

/**
 * /ems/autostore/saveEq
 * 新增/修改设备
 * 
 * */
export const saveEq = (data) => axios.request({
  url: `${base_url}/ems/autostore/saveEq`,
  data,
  method: 'post'
});
  /**
   * /ems/autostore/listEq
   * 设备列表
   * */
export const eqList = (data) => axios.request({
  url: `${base_url}/ems/autostore/listEq`,
  data,
  method: 'post'
});
  /**
   * /ems/autostore/updEnable
   * 更新设备状态
   * */
export const updEnable = (data) => axios.request({
  url: `${base_url}/ems/autostore/updEnable`,
  data,
  method: 'post'
});
