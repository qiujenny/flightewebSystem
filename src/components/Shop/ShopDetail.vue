<template>
  <div class="shop-detail main-padding">
    <div class="add_title"><span class="addTitle_txet">基础信息</span></div>
    <a-descriptions :column="2">
      <a-descriptions-item label="分店编码">
        {{detailData.shopCode}}
      </a-descriptions-item>
      <a-descriptions-item label="分店名称">
        {{detailData.shopName}}
      </a-descriptions-item>
      <a-descriptions-item label="店长编码">
        {{detailData.managerCode}}
      </a-descriptions-item>
      <a-descriptions-item label="店长">
        {{detailData.managerName}}
      </a-descriptions-item>
      <a-descriptions-item label="省市区">
        {{detailData.region}}
      </a-descriptions-item>
      <a-descriptions-item label="详细地址">
        {{detailData.ptAddr}}
        <a-button v-if="detailData.region && detailData.ptAddr" type="link" icon="environment" @click="() => mapModalVisible = true"/>
      </a-descriptions-item>
    </a-descriptions>
    <div class="eq-info">
      <div class="add_title"><span class="addTitle_txet">终端信息</span></div>
      <a-table
        bordered
        size="small"
        :columns="columns"
        :data-source="detailData.eqList"
        rowKey="eqmSn"
      />
    </div>
    <div class="add_title"><span class="addTitle_txet">客户信息</span></div>
    <div class="staff-info">客服: {{staffList}}</div>
    <div class="operate-btn">
      <a-button @click="handleBack">
        返回
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ShopDetail',
  data() {
    return {
      shopId: null,
      detailData: {},
      coordinate: null,
      mapModalVisible: false,
      mapProps: {
        cityName: '',
        position: ''
      },
      eqList: [],
      columns: [
        {
          title: '设备编号',
          dataIndex: 'eqmSn',
        },
        {
          title: '设备类型',
          dataIndex: 'productTypeId',
          customRender: (text, record, index) => {
            const obj = {
              3: '中控',
              4: '收银机',
              5: '手持机',
              6: '门控',
            };
            return obj[text];
          }
        },
      ]
    };
  },
  activated() {
    const { shopId } = this.$route.params;
    this.shopId = Number(shopId);
    this.getShopDetail({ shopId });
  },
  deactivated() {
    this.coordinate = null;
  },
  computed: {
    staffList() {
      const { staffList } = this.detailData;
      return staffList ? staffList.join(', ') : '暂无数据';
    }
  },
  methods: {
    ...mapActions(['shopDetailAction']),
    // 获取店铺详情
    getShopDetail(payload) {
      this.shopDetailAction(payload).then(res => {
        this.detailData = res.data || {};
        const { shopName, staffId, region, latitude, longitude, ptAddr } = this.detailData;
        this.coordinate = {
          longitude,
          latitude
        };
        this.mapProps = {
          cityName: region.split('/').join(','),
          position: ptAddr
        };
      });
    },
    // 取消
    handleBack() {
      this.$router.back();
    },
  }
};
</script>

<style lang="less" scoped>
.shop-detail {
  .operate-btn {
    text-align: center;
  }
  .ant-descriptions {
    width: 80%;
    margin: 30px 100px;
  }
  .eq-info {
    margin-bottom: 30px;
  }
  .ant-table-wrapper {
    width: 80%;
    margin: 20px 100px;
  }
  .staff-info {
    width: 80%;
    margin: 20px 100px;
  }
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
}
</style>
