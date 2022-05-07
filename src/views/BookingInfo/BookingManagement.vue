<template>
  <div class="main-padding">
    <a-row :gutter="24">
      <a-col class="gutter-row" :span="3">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>分店</span></div>
          <div>
            <a-select
            placeholder="请选择"
            style="width: 100%"
            @change="shopChange"
            :options="shopList"
            v-model="shopName"
            >
            </a-select>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="3">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>订单状态</span></div>
          <div>
            <a-select
            placeholder="请选择"
            style="width: 100%"
            v-model="orderStateName"
            @change="orderChange"
            :options="orderType"
            >
            </a-select>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>订单号</span></div>
          <a-input v-model="searchParams.orderNo" placeholder="请输入" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>创建日期</span></div>
          <a-date-picker @change="onChange" v-model="searchParams.createTimeStart" placeholder="请选择" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>RFID</span></div>
          <a-input v-model="searchParams.rfid" placeholder="请输入" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>收银设备</span></div>
          <a-input v-model="searchParams.eqSn" placeholder="请输入" />
        </div>
      </a-col>
    </a-row>
    <div class="button-group">
        <div class="button-left">
            <a-button  @click="exportList">导出</a-button>
        </div>
        <div class="button-right">
            <a-button style="margin-left: 10px" type="primary" @click="searchList" >搜索</a-button>
            <a-button style="margin-left: 10px" @click="resetInput">重置</a-button>
        </div>
    </div>
    <div class="table">
       <table-header :columns="columns" :orderList='orderList' :total='total' :loading='loading' @change="changePage" @onShowSizeChange = 'onShowSizeChange'>
       </table-header>
    </div>
  </div>
</template>
<script>
import tableHeader from './OrderTable';
import { orderList, exportList, shopWrdList } from '../../api/order';
import { downloadExcel } from '../../libs/tools';

export default {
  name: 'bookingManagement',
  components: {
    tableHeader
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          width: 80,
        },
        {
          title: '订单号',
          dataIndex: 'orderNo',
          width: 200,
          scopedSlots: { customRender: 'orderNo' },
        },
        {
          title: '订单状态',
          dataIndex: 'orderStateName',
          width: 150,
        },
        {
          title: '数量',
          dataIndex: 'orderPkgQty',
          width: 150,
        },
        {
          title: '金额',
          dataIndex: 'amount',
          width: 150,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 200,
        },
        {
          title: '分店',
          dataIndex: 'shopName',
          ellipsis: true,
        },
        {
          title: '收银设备',
          dataIndex: 'eqSn',
          width: 300,
        },
      ], // 表头信息
      orderList: [], // 订单列表
      total: 0, // 订单数量
      shopList: [], // 分店数据
      orderType: [
        {
          value: 0,
          label: '待支付'
        },
        {
          value: 3,
          label: '已完成'
        },
        {
          value: 4,
          label: '已关闭'
        }
      ], // 订单状态
      loading: true,
      orderStateName: undefined,
      shopName: undefined,
      searchParams: {
        shopId: '',
        orderState: '',
        orderNo: '',
        createTimeStart: '',
        createTimeEnd: '',
        rfid: '',
        pageNum: 0,
        pageSize: 10
      }, // 查询参数
    };
  },
  created() {
    this.getOrderList();
    this.getShopWrdList();
  },
  methods: {
    shopChange(val) {
      this.searchParams.shopId = val;
    },
    orderChange(val) {
      this.searchParams.orderState = val;
    },
    onChange(date, dateString) {
      this.searchParams.createTimeStart = dateString;
      this.searchParams.createTimeEnd = dateString;
    },
    // 导出
    exportList() {
      exportList({ ...this.searchParams }).then(res => {
        console.log(res);
        downloadExcel(res, '订单信息');
      });
      // console.log(exportList(this.searchParams));
    },
    // 搜索
    searchList() {
      this.getOrderList();
    },
    // 重置
    resetInput() {
      this.orderStateName = undefined;
      this.shopName = undefined;
      this.searchParams = {
        shopId: '',
        orderState: '',
        orderNo: '',
        createTimeStart: '',
        createTimeEnd: '',
        rfid: '',
        pageNum: 0,
        pageSize: 10
      }; // 查询参数
    },
    // 获取订单列表
    getOrderList() {
      orderList(this.searchParams).then(res => {
        if (res.code === 200) {
          this.loading = false;
          res.data.forEach((val, index) => {
            val.key = index + 1;
          });
          this.orderList = res.data;
          this.total = res.pageInfo.total;
        }
      });
    },
    // 获取分店
    getShopWrdList() {
      const query = {
        pageNumber: 0,
        pageSize: 10000
      };
      shopWrdList(query).then(res => {
        // console.log(res.data);
        res.data.forEach(val => {
          const option = {
            value: val.shopId,
            label: val.shopName
          };
          this.shopList.push(option);
        });
      });
    },
    // 分页
    changePage(page, pageSize) {
      this.searchParams.pageNum = page - 1;
      this.searchParams.pageSize = pageSize;
      this.getOrderList();
    },
    onShowSizeChange(current, pageSize) {
      this.searchParams.pageNum = current - 1;
      this.searchParams.pageSize = pageSize;
      this.getOrderList();
    },
  }

};
</script>
<style scoped lang='less'>
.gutter-box-label{
  width: 80px;
}
.button-group{
    padding: 20px 0 10px;
    display: flex;
    justify-content : space-between;
    // .button-right{
    //     padding-right: 320px;
    // }
}
</style>
