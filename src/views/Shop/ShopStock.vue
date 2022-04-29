<template>
  <div class="shop-stock main-padding">
    <search-form
      ref="searchForm"
      name="shopStockSearchForm"
      :searchForm="searchForm"
      @search="handleSearch"
      @reset="handleSearch"
    />
    <div class="tableBtn">
      <a-button type="primary" @click="handleOpen">添加商品目录</a-button>
      <a-button type="primary" @click="handleSync">同步RFID</a-button>
    </div>
    <table-com
      ref="tableCom"
      :columns="columns"
      :actions="shopStockListAction"
      :params="params"
      rowKey="barcode"
    />
    <!-- 商品详情弹层 -->
    <goods-detail
      v-if="detailVisible"
      :visible="detailVisible"
      :shopId="params.shopId"
      :goodsDetail="goodsDetail"
      @close="detailVisible = false"
    />
    <!-- 编辑商品弹层 -->
    <edit-goods
      v-if="editVisible"
      :visible="editVisible"
      :shopId="params.shopId"
      :goodsDetail="goodsDetail"
      @close="editVisible = false"
      @reload="getListData"
    />
    <!-- 添加商品 -->
    <transfer-modal
      v-if="transferModalVisible"
      :visible="transferModalVisible"
      :treeData="transferModalTreeData"
      :shopId="params.shopId"
      @close="transferModalVisible = false"
      @reload="getListData"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableCom from '@/components/Shop/TableCom.vue';
import SearchForm from '@/components/Shop/SearchForm.vue';
import GoodsDetail from '@/components/Shop/GoodsDetail.vue';
import EditGoods from '@/components/Shop/EditGoods.vue';
import TransferModal from '@/components/Shop/TransferModal.vue';

export default {
  name: 'ShopStock',
  components: {
    SearchForm,
    TableCom,
    GoodsDetail,
    EditGoods,
    TransferModal
  },
  data() {
    return {
      // 搜索表单配置
      searchForm: [
        {
          field: 'shopId',
          label: '分店',
          type: 'searchSelect',
          defaultValue: '',
          options: [],
          change: () => this.$nextTick(() => { this.$refs.searchForm.handleSearch(); })
        },
        {
          field: 'classParentId',
          label: '商品分类',
          type: 'treeSelect',
          treeData: [],
          replaceFields: { children: 'childList', title: 'name', key: 'id', value: 'id' }
        },
        {
          field: 'whsGoodsName',
          label: '商品名称',
          type: 'input',
          placeholder: '商品名称/编码'
        },
        {
          field: 'rfid',
          label: 'RFID',
          type: 'input',
        }
      ],
      // 表格配置
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
        { title: '商品编码',  dataIndex: 'skuCode' },
        { title: '商品名称', dataIndex: 'whsGoodsName' },
        { title: '包装单位', dataIndex: 'pkg' },
        { title: '包装规格', dataIndex: 'pkgQty' },
        { title: '价格', dataIndex: 'whsPrice' },
        { title: '商品分类', dataIndex: 'className' },
        { title: '品牌', dataIndex: 'brandName' },
        {
          title: '在库RFID',
          dataIndex: 'availableQty',
          customRender: (text, record, index) => (
            <a-button type="link" onClick={() => this.openRfid(record)}>
              {text}
            </a-button>
          )
        },
        {
          title: '操作',
          key: 'operator',
          customRender: (text, record) => (
            <div>
              <a-button type="link" onClick={() => this.openModal(record, 'detailVisible')}>
                详情
              </a-button>
              <a-button type="link" onClick={() => this.openModal(record, 'editVisible')}>
                编辑
              </a-button>
            </div>
          )
        },
      ],
      params: {
        shopType: 2
      }, // 筛选条件
      shopList: [], // 分店下拉
      goodsClass: [], // 商品分类
      goodsDetail: {}, // 商品详情/编辑
      detailVisible: false,
      editVisible: false,
      transferModalVisible: false,
      transferModalTreeData: []
    };
  },
  async activated() {
    // 获取商品分类
    if (!this.goodsClass.length) {
      this.goodsClassAction().then(res => {
        if (res.code === 200) {
          this.goodsClass = res.data || [];
          this.searchForm[1].treeData = [...this.goodsClass];
          this.transferModalTreeData = [...this.goodsClass];
        }
      });
    }
    // 获取分店下拉数据
    let res = null;
    if (!this.shopList.length) {
      res = await this.shopListAction({ pageNumber: 0, pageSize: 10000 });
      if (res.code === 200 && res.data) {
        this.shopList = res.data.map(item => ({ label: item.shopName, value: item.shopId }));
      }
      // 默认选中第一个分店
      const defaultValue = this.shopList.length ? this.shopList[0].value : '';
      this.searchForm[0].options = [...this.shopList];
      this.searchForm[0].defaultValue = defaultValue;
      this.params = { ...this.params, shopId: defaultValue };
    } else {
      // 获取列表
      this.getListData();
    }
  },
  methods: {
    ...mapActions(['shopStockListAction', 'shopListAction', 'goodsClassAction', 'syncRfidAction']),
    getListData() {
      this.$refs.tableCom.getData();
    },
    // 详情/编辑弹层
    openModal(data, flag) {
      this.goodsDetail = { ...data };
      this[flag] = true;
    },
    // 添加商品
    handleOpen() {
      if (!this.params.shopId) {
        this.$messag.error('请选择分店');
        return;
      }
      this.transferModalVisible = true;
    },
    openRfid(record) {
      const { barcode, pkgQty, whsGoodsName, whsPrice, skuCode } = record;
      this.$router.push(
        {
          name: 'goodsManagement',
          params: { shopId: this.params.shopId },
          query: { barcode, pkgQty, whsGoodsName, whsPrice, skuCode }
        }
      );
    },
    // 同步rfid
    handleSync() {
      if (!this.params.shopId) {
        this.$message.error('请选择分店');
        return;
      }
      this.syncRfidAction({ shopId: this.params.shopId }).then(res => {
        this.$message.info(res.msg);
      });
    },
    // 搜索/重置
    handleSearch(data) {
      this.params = { ...this.params, ...data };
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
  .ant-btn {
    margin-right: 20px;
  }
}
</style>
