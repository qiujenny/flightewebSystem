<template>
  <div class="goods-management main-padding">
    <a-row :gutter="60" class="goods-info">
      <a-col :span="12">
        <a-descriptions :title="goodsDetail.whsGoodsName" >
          <a-descriptions-item label="编码">
            {{goodsDetail.skuCode}}
          </a-descriptions-item>
          <a-descriptions-item label="价格">
            ￥{{goodsDetail.whsPrice}}
          </a-descriptions-item>
          <a-descriptions-item label="箱规">
            {{goodsDetail.pkgQty}}
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
    <div class="rfid-talbe">
      <a-row>
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box" style="width: 100%">
            <div class="gutter-box-label"><span>FRID状态</span></div>
            <a-select style="width: 160px" v-model="params.pwTypeId" :options="statusList" />
          </div>
        </a-col>
      </a-row>
      <table-com
        ref="tableCom"
        :columns="columns"
        :actions="rfidListAction"
        :params="params"
        rowKey="rfid"
    />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableCom from '@/components/Shop/TableCom.vue';

export default {
  name: 'GoodsManagement',
  components: {
    TableCom
  },
  data() {
    return {
      statusList: [
        { label: '全部', value: '' },
        { label: '在库', value: 25 },
        { label: '已销售出库', value: 26 },
        { label: '已过期出库', value: 30 },
      ],
      columns: [
        {
          title: '序号',
          key: 'index',
          dataIndex: 'index',
          customRender: (text, record, index) => {
            const { pageNumber, pageSize } = this.$refs.tableCom;
            return (pageSize * pageNumber) + index + 1;
          }
        },
        { title: '入库时间',  dataIndex: 'inTime' },
        { title: '出库时间',  dataIndex: 'outTime' },
        { title: 'RFID',  dataIndex: 'rfid' },
      ],
      params: {
        pwTypeId: 25,
        shopId: this.$route.params.shopId,
        barcodes: [this.$route.query.barcode]
      },
      goodsDetail: this.$route.query
    };
  },
  activated() {
    this.$refs.tableCom.getData();
  },
  deactivated() {
    this.params.pwTypeId = 25;
  },
  methods: {
    ...mapActions(['rfidListAction']),
  },
};
</script>

<style lang="less" scoped>
.goods-management {
  .ant-row.goods-info {
    border-bottom: 1px solid #ccc;
  }
  .rfid-talbe {
    padding: 0 30px;
    .gutter-row {
      margin: 24px 0;
    }
  }
}
</style>
