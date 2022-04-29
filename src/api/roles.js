import axios from '../libs/api.request';
import base_url from '../../config/url';

/**
 * /role/queryRole
 * name:名称模糊查询，state:状态,uid:用户id,
 * pageNumber：每页条数--有的话，查询分页，pageSize：当前页数（默认第一页）
 * */
export const queryRole = (data) => axios.request({
  url: `${base_url}/sales/wrd//shopRole/queryRole`,
  data,
  method: 'post'
});
/**
 * queryRoleById
 * 角色詳情
 * */
export const queryRoleById = (roleId) => axios.request({
  url: `${base_url}/sales/wrd/shopRole/queryRoleById/${roleId}`,
  method: 'get'
});

export const queryNavTreeByRole = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopPrivilege/queryUserPrivTree`,
  data,
  method: 'post'
});

/*
* 根据登陆账号可以查看到的角色列表
* sales/wrd/shopRole/queryRoleByUser
* staffId
* */
export const queryRoleByUser = (data) => axios.request({
  url: `${base_url}/sales/wrd/shopRole/queryRoleByUser`,
  data,
  method: 'post'
});
