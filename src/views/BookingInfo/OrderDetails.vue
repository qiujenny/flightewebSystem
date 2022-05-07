<template>
  <div class="main-padding">
    <div class="add_title"><span class="addTitle_txet">订单详情</span></div>
    <div class="orderInfo">
      <div class="order-item"><span>无人店订单号：{{orderNo}}</span></div>
      <div class="order-item"><span>订单状态：{{orderStateName}}</span></div>
      <div class="order-item"><span>分店：{{shopName}}</span></div>
      <div class="order-item"><span>支付时间：{{payTime}}</span></div>
      <div class="order-item"><span>支付方式：{{payTypeName}}</span></div>
      <div class="order-item"><span>收银设备：{{eqmSn}}</span></div>
      <div class="order-item"><span>关闭原因：{{closeDesc}}</span></div>
    </div>
    <div class="orderDetail_table">
       <a-table
       :columns="columns"
       :data-source="orderInfo"
       :pagination="false"
       :loading="loading"
       >
       <template slot="footer">
         合计
         <span class="num">{{totalNum}}</span>
         <span class="amount">{{totalAmount}}</span>
       </template>
       </a-table>
   </div>
   <div class="createTime"><span>创建时间：{{createTime}}</span></div>
   <div class="back_btu">
      <a-button @click="getback">返回</a-button>
   </div>
  </div>
</template>
<script>
import { orderDetail } from '../../api/order';

export default {
  data() {
    return {
      loading: true,
      autoOrderId: '', // 订单ID
      orderNo: '',
      orderStateName: '',
      shopName: '',
      payTime: '',
      payTypeName: '',
      eqmSn: '',
      closeDesc: '',
      createTime: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          width: 80,
        },
        {
          title: '商品编码',
          dataIndex: 'goodsSkuCode',
          width: 180,
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          width: 250,
        },
        {
          title: '规格',
          dataIndex: 'spec',
          width: 100,
        },
        {
          title: '价格',
          dataIndex: 'goodsPrice',
          width: 100,
        },
        {
          title: '单价',
          dataIndex: 'unitPrice',
          width: 100,
        },
        {
          title: '数量',
          dataIndex: 'num',
          width: 100,
        },
        {
          title: 'RFID',
          dataIndex: 'rfids',
          width: 300,
        },
        {
          title: '小计金额',
          dataIndex: 'totalGoodsPrice',
          width: 300,
        },
      ], // 表头信息
      orderInfo: [],
      totalNum: '', // 合计数量
      totalAmount: '', // 合计金额
      isBackList: false

    };
  },
  created() {
    this.autoOrderId = this.$route.query.autoOrderId;
    this.getOrderDetail();
  },
  activated() {
    if (this.isBackList) {
      this.autoOrderId = this.$route.query.autoOrderId;
      this.totalNum = 0;
      this.totalAmount = 0;
      this.getOrderDetail();
    }
    this.isBackList = true;
  },
  methods: {
    getback() {
      this.$nextTick(() => this.$router.back());
    },
    getOrderDetail() {
      orderDetail(this.autoOrderId).then(res => {
        const { code, data } = res;
        if (code === 200) {
          this.loading = false;
          this.orderNo = data.orderNo;
          this.orderStateName = data.orderStateName;
          this.shopName = data.shopName;
          this.payTime = data.payTime;
          this.payTypeName = data.payTypeName;
          this.eqmSn = data.eqmSn;
          this.closeDesc = data.closeDesc;
          this.createTime = data.createTime;
          data.detailList.forEach((item, index) => {
            item.key = index + 1;
            this.totalNum += item.num;
            this.totalAmount += item.totalGoodsPrice;
          });
          this.orderInfo = data.detailList;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.add_title{
    text-align: left;
    border: 1px solid #ccc;
    padding-left:5px;
    height: 30px;
    margin-bottom: 10px;
}
.addTitle_txet{
    border-left: 2px solid #1890ff;
    line-height: 30px;
    padding: 3px 0 2px 4px;
    font-weight: 800;
}
.orderInfo{
  .order-item{
    float: left;
    width: 25%;
    padding-bottom: 20px;
  }
}
.num{
  display: inline-block;
  width: 79.7%;
  text-align: right;
  padding-right: 25.6%;
}
.createTime{
  padding: 15px 0 40px;
}
.back_btu{
    text-align: center;
}
</style>
