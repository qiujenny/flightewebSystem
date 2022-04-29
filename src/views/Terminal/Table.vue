<template>
   <div class="equ_table">
       <a-table :columns="columns" :data-source="equList" :pagination="false" :loading="loading">
             <a slot="eqmSn" slot-scope="text,record"  @click="onEquInfo(record)">{{ text }}</a>
             <a slot="portInfo">查看</a>
             <a slot="operation" slot-scope="text,record"  @click="operation(record)" v-if="record.enable">{{ text }}</a>
             <a slot-scope="text" v-else style="color:#ccc;cursor: not-allowed;">{{ text }}</a>
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
    equList: { type: Array, default: () => [] },
    total: { type: Number },
    loading: { type: Boolean },
  },
  data() {
    return {
      locale: zhCN,
    };
  },
  methods: {
    // 设备详情
    onEquInfo(record) {
      console.log(record);
      sessionStorage.setItem('equInfo', JSON.stringify(record));
      this.$router.push({
        name: 'equInfo'
      });
    },
    // 编辑
    operation(record) {
      console.log(record);
      this.$router.push({
        name: 'addEqu',
        query: { eqmId: record.eqmId, eqmSn: record.eqmSn, productTypeName: record.productTypeName }
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
