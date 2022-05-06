<template>
  <div class="create-shop main-padding">
    <search-form
      name="createShopSearchForm"
      :searchForm="searchForm"
      @search="handleSearch"
      @reset="handleReset"
    />
    <div class="tableBtn">
      <a-button type="primary" @click="openAddOrEdit(null)">开店</a-button>
    </div>
    <table-com
      ref="tableCom"
      :columns="columns"
      :actions="shopListAction"
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
  name: 'CreateShop',
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
            <a-button type="link" onClick={() => this.openShopDetail(record)}>
              {text}
            </a-button>
          )
        },
        { title: '店长', dataIndex: 'managerName' },
        { title: '省市区', dataIndex: 'region' },
        { title: '地址', dataIndex: 'ptAddr' },
        {
          title: '操作',
          key: 'operator',
          customRender: (text, record) => (
            <a-button type="link" onClick={() => this.openAddOrEdit(record)}>
              编辑
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
    ...mapActions(['shopListAction']),
    openAddOrEdit(data) {
      let shopId = '0';
      if (data) shopId = data.shopId;
      this.$router.push({ name: 'addOrEditShop', params: { shopId } });
    },
    openShopDetail(data) {
      const { shopId } = data;
      this.$router.push({ name: 'shopDetail', params: { shopId } });
    },
    // 搜索
    handleSearch(data) {
      this.params = { ...data };
    },
    // 重置
    handleReset(data) {
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
