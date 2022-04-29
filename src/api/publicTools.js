/**
 * 公共模块api
 */
import base_url from '../../config/url';
import axios from '../libs/api.request';
// 默认导出
export default {
  baseUrl: base_url,
  // 上传附件
  getUploadUrl() {
    return `${this.baseUrl}/fm/fileUpload/uploadSingle`;
  },
  upLoadUrl(data) {
    return axios.request({
      url: `${base_url}/fm/fileUpload/uploadSingleBase64`,
      method: 'post',
      data,
    });
  },
  // 下载附件Url
  downloadFileUrl(shortCode) {
    return `${this.baseUrl}/fm/fileDownload/rectByShortCode/${shortCode}`;
  },
  //
  fileUrlHeader() {
    return `${this.baseUrl}/fm/fileDownload/rectByShortCode/`;
  },

  // 将图片code传到uploadWxMedia接口，返回wxCode
  uploadWxMedia(data) {
    return axios.request({
      url: `${base_url}/payment/wxpay/uploadWxMedia`,
      method: 'post',
      data,
    });
  },

  // 二维码图片的接口
  getQRCodeUrl() {
    return `${this.baseUrl}/payment/common/exportQRCode?beQRCodeUrl=`;
  },
};
