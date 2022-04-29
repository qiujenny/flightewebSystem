<template>
  <div class="shop-setting main-padding">
    <div class="add_title"><span class="addTitle_txet">终端信息</span></div>
    <a-row :gutter="40" v-if="shopDetail">
      <a-col :span="12">
        <dynamic-form
          ref="eq4"
          name="dynamic_eq4_form"
          title="收银设备"
          :itemLen="eq4List.length || 0"
          :eqList="eq4Options"
          :initValue="eq4InitValue"
        />
      </a-col>
      <a-col :span="12">
        <dynamic-form
          ref="eq6"
          name="dynamic_eq6_form"
          title="门控设备"
          :itemLen="eq6List.length || 0"
          :eqList="eq6Options"
          :initValue="eq6InitValue"
        />
      </a-col>
    </a-row>
    <a-row :gutter="40" v-if="shopDetail" style="border-top: 1px solid #ccc; padding-top: 20px;">
      <a-col :span="12">
        <dynamic-form
          ref="eq3"
          name="dynamic_eq3_form"
          title="中控设备"
          :itemLen="eq3List.length || 0"
          :eqList="eq3Options"
          :initValue="eq3InitValue"
        />
      </a-col>
      <a-col :span="12">
        <dynamic-form
          ref="eq5"
          name="dynamic_eq5_form"
          title="手持机设备"
          :itemLen="eq5List.length || 0"
          :eqList="eq5Options"
          :initValue="eq5InitValue"
        />
      </a-col>
    </a-row>
    <div class="operate-btn">
      <a-button @click="handleBack">
        取消
      </a-button>
      <a-button type="primary" :loading="subLoading" @click="handleSubmit">
        保存
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import DynamicForm from '@/components/Shop/DynamicForm';

export default {
  name: 'ShopSetting',
  components: {
    DynamicForm
  },
  data() {
    return {
      subLoading: false,
      shopId: null,
      shopDetail: null,
      allEqList: [],
      eq3List: [],
      eq3Options: [],
      eq3InitValue: {},
      eq4List: [],
      eq4Options: [],
      eq4InitValue: {},
      eq5List: [],
      eq5Options: [],
      eq5InitValue: {},
      eq6List: [],
      eq6Options: [],
      eq6InitValue: {},
    };
  },
  created() {
    const { shopId } = this.$route.params;
    if (Number(shopId)) {
      this.shopId = Number(shopId);
      this.getEqList({ shopId });
      this.getShopDetail({ shopId });
    } else {
      this.shopId = null;
    }
  },
  methods: {
    ...mapActions(['shopDetailAction', 'eqListAction', 'saveEqAction']),
    // 店铺详情
    getShopDetail(payload) {
      this.shopDetailAction(payload).then(res => {
        if (res.code === 200 && res.data) {
          this.shopDetail = res.data || {};
          const { eqList } = res.data || {};
          // 处理收银/门控设备回显
          this.eq3List = eqList.filter(item => item.productTypeId === 3);
          this.eq4List = eqList.filter(item => item.productTypeId === 4);
          this.eq5List = eqList.filter(item => item.productTypeId === 5);
          this.eq6List = eqList.filter(item => item.productTypeId === 6);
          if (this.eq3List.length) {
            const eq3keys = [...Array(this.eq3List.length).keys()];
            const eq3names = this.eq3List.map((item) => item.eqmSn);
            this.eq3InitValue = {
              keys: eq3keys,
              names: eq3names
            };
          }
          if (this.eq4List.length) {
            const eq4keys = [...Array(this.eq4List.length).keys()];
            const eq4names = this.eq4List.map((item) => item.eqmSn);
            this.eq4InitValue = {
              keys: eq4keys,
              names: eq4names
            };
          }
          if (this.eq5List.length) {
            const eq5keys = [...Array(this.eq5List.length).keys()];
            const eq5names = this.eq5List.map((item) => item.eqmSn);
            this.eq5InitValue = {
              keys: eq5keys,
              names: eq5names
            };
          }
          if (this.eq6List.length) {
            const eq6keys = [...Array(this.eq6List.length).keys()];
            const eq6names = this.eq6List.map((item) => item.eqmSn);
            this.eq6InitValue = {
              keys: eq6keys,
              names: eq6names
            };
          }
        } else {
          this.shopDetail = null;
        }
      });
    },
    // 设备列表(下拉)
    getEqList(payload) {
      this.eqListAction({ pageNum: 0, pageSize: 100000 }).then(res => {
        this.eq3Options = []; // 中控下拉
        this.eq4Options = []; // 收银下拉
        this.eq5Options = []; // 手持机下拉
        this.eq6Options = []; // 门控下拉
        if (res.code === 200 && res.data) {
          this.allEqList = res.data || [];
          (res.data || []).forEach(item => {
            const { eqmSn, productTypeId } = item;
            const obj = {
              label: eqmSn,
              value: eqmSn,
            };
            if (productTypeId === 3) this.eq3Options.push(obj);
            if (productTypeId === 4) this.eq4Options.push(obj);
            if (productTypeId === 5) this.eq5Options.push(obj);
            if (productTypeId === 6) this.eq6Options.push(obj);
          });
        }
      });
    },
    // 取消
    handleBack() {
      this.$router.push({ name: 'shopManagement' });
    },
    // 保存
    handleSubmit() {
      const { eq3, eq4, eq5, eq6 } = this.$refs;
      const eq3names = eq3.form.getFieldsValue().names;
      const eq4names = eq4.form.getFieldsValue().names;
      const eq5names = eq5.form.getFieldsValue().names;
      const eq6names = eq6.form.getFieldsValue().names;
      const arr = [...eq3names, ...eq4names, ...eq5names, ...eq6names].filter(item => item !== null && item !== undefined && item !== '');
      const payload = arr.length ? arr.map(item => {
        const data = this.allEqList.find(eqItem => eqItem.eqmSn === item);
        const { eqmId, eqmSn, productTypeId } = data;
        return {
          shopId: this.shopId,
          eqId: eqmId,
          eqNo: eqmSn,
          eqTypeId: productTypeId
        };
      }) : [{ shopId: this.shopId }];
      this.subLoading = true;
      this.saveEqAction(payload).then(res => {
        if (res.code === 200) {
          this.$message.success('保存成功');
          this.handleBack();
        } else {
          this.$message.error(res.msg);
        }
        this.subLoading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.shop-setting {
  .ant-form {
    margin-top: 20px;
  }
  .operate-btn {
    text-align: center;
    margin-top: 60px;
    .ant-btn:first-child {
      margin-right: 30px;
    }
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
