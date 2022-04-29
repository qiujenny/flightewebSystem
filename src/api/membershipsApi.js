import axios from '@/libs/api.request';

// 会员管理 - 会员信息API
// sales/shop/getMembersList
// 请求方式
// 	POST
// 请求参数	参数名称	参数类型	是否必须	字段说明
// 	shopId	int	false	分店id
// 	pageNumber	int	false	当前页 默认0
// 	nickname	string	false	昵称
// 	membName	string	false	姓名
// 	phone	string	false	电话
// 	regTimeStart   regTimeEnd
// 	pageSize	int	false	每页条数 默认10
const membershipsApi = {
  getMembershipsList(data) {
    return axios.request({
      url: '/sales/shop/getWrdMembersList',
      method: 'post',
      data
    });
  },
};

export default membershipsApi;
