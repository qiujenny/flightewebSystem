import {
  shopListApi,
  shopEqListApi,
  managerListApi,
  shopDetailApi,
  saveShopApi,
  updateShopApi,
  eqListApi,
  saveEqApi,
  shopStockApi,
  uploadPicApi,
  saveGoodsApi,
  goodsClassApi,
  goodsListApi,
  syncRfidApi,
  rfidListApi,
} from '../../api/shop';
import httpFn from '../httpFn';

export default {
  state: {},
  mutations: {},
  actions: {
    // 创建店铺列表
    shopListAction(context, payload) {
      return httpFn('', shopListApi, payload);
    },
    // 店长下拉
    managerListAction(context, payload) {
      return httpFn('', managerListApi, payload);
    },
    // 商品分类下拉
    goodsClassAction(context, payload) {
      return httpFn('', goodsClassApi, payload);
    },
    // 店铺详情
    shopDetailAction(context, payload) {
      return httpFn('', shopDetailApi, payload);
    },
    // 创建店铺
    saveShopAction(context, payload) {
      return httpFn('', saveShopApi, payload);
    },
    // 更新店铺
    updateShopAction(context, payload) {
      return httpFn('', updateShopApi, payload);
    },
    // 店铺管理列表
    shopEqListAction(context, payload) {
      return httpFn('', shopEqListApi, payload);
    },
    // 候选设备
    eqListAction(context, payload) {
      return httpFn('', eqListApi, payload);
    },
    // 保存关联设备
    saveEqAction(context, payload) {
      return httpFn('', saveEqApi, payload);
    },
    // 店铺进货列表
    shopStockListAction(context, payload) {
      return httpFn('', shopStockApi, payload);
    },
    // 添加商品列表
    goodsListAction(context, payload) {
      return httpFn('', goodsListApi, payload);
    },
    // 店铺商品图片上传
    uploadPicAction(context, payload) {
      return httpFn('', uploadPicApi, payload);
    },
    // 添加/编辑商品
    saveGoodsAction(context, payload) {
      return httpFn('', saveGoodsApi, payload);
    },
    // 同步RFID
    syncRfidAction(context, payload) {
      return httpFn('', syncRfidApi, payload);
    },
    // rfid列表
    rfidListAction(context, payload) {
      return httpFn('', rfidListApi, payload);
    },
  },
};
