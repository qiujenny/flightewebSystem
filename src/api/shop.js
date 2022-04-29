import axios from '../libs/api.request';
import base_url from '../../config/url';

// 店铺列表
export const shopListApi = (data) =>
  axios.request({
    url: `${base_url}/sales/wrd/shop/getShopWrdList`,
    method: 'post',
    data,
  });

// 店长列表(下拉)
export const managerListApi = (data) =>
  axios.request({
    url: `${base_url}/sales/wrd/shopStaff/getManagerUserList`,
    method: 'post',
    data,
  });

// 商品分类下拉
export const goodsClassApi = () =>
  axios.request({
    url: `${base_url}/goods/goodsclass/goodsAllNewClassTree/0`,
    method: 'get',
  });

// 店铺详情
export const shopDetailApi = (data) =>
  axios.request({
    url: `${base_url}/sales/wrd/shop/getShopWrdDetail`,
    method: 'post',
    data,
  });

// 保存店铺
export const saveShopApi = (data) =>
  axios.request({
    url: `${base_url}/sales/wrd/shop/saveWrdShop`,
    method: 'post',
    data,
  });

// 保存店铺
export const updateShopApi = (data) =>
  axios.request({
    url: `${base_url}/sales/wrd/shop/updWrdShop`,
    method: 'post',
    data,
  });

// 店铺管理列表
export const shopEqListApi = (data) =>
  axios.request({
    url: `${base_url}/sales/shopEq/list`,
    method: 'post',
    data,
  });

// 设备列表
export const eqListApi = (data) =>
  axios.request({
    url: `${base_url}/ems/autostore/listEq`,
    method: 'post',
    data,
  });

// 关联设备
export const saveEqApi = (data) =>
  axios.request({
    url: `${base_url}/sales/shopEq/save`,
    method: 'post',
    data,
  });

// 店铺商品列表
export const shopStockApi = (data) =>
  axios.request({
    url: `${base_url}/goods/wholesaleGooods/wholesaleGooodsList`,
    method: 'post',
    data,
  });

// 添加商品列表
export const goodsListApi = (data) =>
  axios.request({
    url: `${base_url}/goods/goodsforeignapi/querySkuByCondition`,
    method: 'post',
    data,
  });

// 上传商品图片
export const uploadPicApi = (data) =>
  axios.request({
    url: `${base_url}/fm/fileUpload/uploadSingle`,
    method: 'post',
    data,
  });

// 编辑商品详情
export const saveGoodsApi = (data) =>
  axios.request({
    url: `${base_url}/goods/wholesaleGooods/saveGoods`,
    method: 'post',
    data,
  });

// 同步rfid
export const syncRfidApi = (data) =>
  axios.request({
    url: `${base_url}/eqcloud/autostore/pushInventoryReq`,
    method: 'post',
    data,
  });

// rfid列表
export const rfidListApi = (data) =>
  axios.request({
    url: `${base_url}/wms/inventory/getWRDPwBillInfo`,
    method: 'post',
    data,
  });
