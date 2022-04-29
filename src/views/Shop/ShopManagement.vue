<template>
  <div class="shop-management main-padding">
    <search-form
      name="shopManagementSearchForm"
      :searchForm="searchForm"
      @search="handleSearch"
      @reset="handleSearch"
    />
    <table-com
      ref="tableCom"
      :columns="columns"
      :actions="shopEqListAction"
      :params="params"
      rowKey="shopId"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableCom from '@/components/Shop/TableCom.vue';
import SearchForm from '@/components/Shop/SearchForm.vue';

export default {
  name: 'ShopManagement',
  components: {
    SearchForm,
    TableCom
  },
  data() {
    return {
      // 搜索表单配置
      searchForm: [
        {
          field: 'shopName',
          label: '分店',
          type: 'input'
        },
        {
          field: 'managerNameOrManagerCode',
          label: '店长',
          type: 'input',
          placeholder: '名字/编码'
        },
        {
          field: 'eqmSn',
          label: '设备编码',
          type: 'input',
        }
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
        { title: '分店编码',  dataIndex: 'shopCode' },
        {
          title: '分店',
          dataIndex: 'shopName',
          customRender: (text, record, index) => (
            <a-button type="link" onClick={() => this.open(record, 'shopDetail')}>
              {text}
            </a-button>
          )
        },
        { title: '店长', dataIndex: 'managerName' },
        { title: '收银设备', dataIndex: 'countPOSSum' },
        { title: '门控设备', dataIndex: 'countDoorControlSum' },
        { title: '中控设备', dataIndex: 'counControlSum' },
        { title: '手持机设备', dataIndex: 'countHandEqmSum' },
        {
          title: '操作',
          key: 'operator',
          customRender: (text, record) => (
            <a-button type="link" onClick={() => this.open(record, 'shopSetting')}>
              设置
            </a-button>
          )
        },
      ],
      params: {}
    };
  },
  activated() {
    this.$refs.tableCom.getData();
  },
  methods: {
    ...mapActions(['shopEqListAction']),
    open(data, routerName) {
      const { shopId } = data;
      this.$router.push({ name: routerName, params: { shopId } });
    },
    // 搜索/重置
    handleSearch(data) {
      this.params = { ...data };
    },
    // 编辑
    handleEdit(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
.tableBtn {
  margin-bottom: 24px;
}
</style>
