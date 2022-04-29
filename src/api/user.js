// eslint-disable-next-line
import axios from '../libs/api.request';
import base_url from '../../config/url';

// export const logout = () => new Promise((resolve) => {
//   resolve({
//     code: 200,
//     data: null,
//     msg: ''
//   });
// });

/**
 * /user/userinfo/queryUserBaseByToken/ 根据token获取用户信息
 *
 */
export const getUserInfo = () => axios.request({
  url: `${base_url}/user/userinfo/queryUserBaseByTokenPC`,
  method: 'get'
});
// RickPS：原queryUserBaseByToken接口里orgList的字段数据，登录后接口优化【0123】
export const queryUserOrgList = () => axios.request({
  url: `${base_url}/user/userinfo/queryUserOrgList`,
  method: 'get'
});
// RickPS：原queryUserBaseByToken接口里employeeNo、roleList、weixinId、phone的字段数据，登录后接口优化【0123】
export const userInfoDetail = () => axios.request({
  url: `${base_url}/user/userinfo/userInfoDetail`,
  method: 'post'
});

/**
 * /userinfo/loginValidateCode 获取登陆验证码
 * */
export const loginValidateCode = () => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/loginValidateCode`,
  method: 'get'
});
/**
 * /userinfo/login 系统登陆
 *
 * */
export const login = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/login`,
  data,
  method: 'post'
});

/**
 * queryUser  根据指定条件查询用户，可以支持分页，返回json数据
 * shopId	int	true	小店id
 * staffId	int	true	当前登陆人的id
 * roleName	string	false	角色名称
 * state	int	false	状态。0禁用，1启用。
 * loginName	string	false	账号
 * trueName	string	false	姓名
 * pageNumber	int	false	当前页 默认0
 * pageSize	int	false	每页条数 默认10
 * */
export const queryUser = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/getUserList`,
  data,
  method: 'post'
});

/**
 * 拉取用户信息 组织机构及角色权限
 * */
export const queryUserById = (id) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/queryUserById/${id}`,
  method: 'get'
});

/*
* sales/wrd/shopStaff/registerShopStaff
* 无人店管理端注册账号
* shopId	int	true	店铺id
* email	string	fales	邮箱
* loginName	string	true	登陆账号
* loginPw	string	true	登陆密码
* loginPw2	string	true	确认密码
* phone	string	true	手机号
* qq	string	false	QQ
* roleIds	array	false	角色id集合
* state	int	true	状态。0禁用，1启用。
* isService	int	true	是否客服。默认0不是，1是
* trueName	string	true	真实姓名
* weixin	string	false	微信
* */
export const registerShopStaff = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/registerShopStaff`,
  data,
  method: 'post'
});
/**
 * 无人店管理端用户信息编辑
 * staffId	int	true	用户id
 * shopId	int	true	店铺id
 * email	string	fales	邮箱
 * loginName	string	true	登陆账号
 * loginPw	string	true	登陆密码
 * loginPw2	string	true	确认密码
 * phone	string	true	手机号
 * qq	string	false	QQ
 * roleIds	array	false	角色id集合
 * state	int	true	状态。0禁用，1启用。
 * trueName	string	true	真实姓名
 * weixin	string	false	微信
 * */
export const editShopStaff = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/editShopStaff`,
  data,
  method: 'post'
});

/**
 * resetUserPassword
 * staffId
 * */
export const resetUserPassword = (data) => axios.request({
  url: `${base_url}/sales//wrd/shopStaff/resetPw`,
  method: 'post',
  data
});

/**
 * 修改用户密码
 * */
export const updatePassword = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/modifyPw`,
  data,
  method: 'post'
});
/**
 * 登出
 * */
export const logOut = () => axios.request({
  url: `${base_url}/sales/wrd/shopStaff/logout`,
  method: 'get'
});
