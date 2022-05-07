<template>
   <div class="equ_table">
       <a-table :columns="columns" :data-source="orderList" :pagination="false" :loading="loading">
             <a slot="orderNo" slot-scope="text,record"  @click="orderInfo(record)">{{ text }}</a>
       </a-table>
       <div class="equ_pag">
           <!-- <a-locale-provider :locale="locale"> -->
            <a-pagination size="small"
            :total="total"
            show-size-changer
            show-quick-jumper
            :show-total="total => `共 ${total} 条`"
            @change="change"
            @showSizeChange="onShowSizeChange"
            />
           <!-- </a-locale-provider> -->

       </div>
   </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'tableHeader',
  props: {
    columns: { type: Array, default: () => [] },
    orderList: { type: Array, default: () => [] },
    total: { type: Number },
    loading: { type: Boolean }
  },
  data() {
    return {
      locale: zhCN,
    };
  },
  methods: {
    orderInfo(record) {
      // console.log(record);
      this.$router.push({
        name: 'orderDetails',
        query: {
          autoOrderId: record.orderId,
        }
      });
    },
    change(page, pageSize) {
      this.$emit('change', page, pageSize);
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.$emit('onShowSizeChange', current, pageSize);
    },
  }
};
</script>

<style lang='less' scoped>
/deep/ .ant-table-tbody > tr > td {
    padding: 7px 16px !important;
    overflow-wrap: break-word;
  }
  .equ_pag{
      padding-top: 20px;
      text-align: right;
  }
</style>
