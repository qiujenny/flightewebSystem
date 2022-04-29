<template>
  <div class="main-padding">
    <div class="add_title"><span class="addTitle_txet">基础信息</span></div>
    <a-form-model :model="eqmInfo"  layout="inline">
    <a-form-model-item label="设备编号">
      <a-input
      :disabled='true'
      v-model="eqmInfo.eqmSn"
      />
    </a-form-model-item>
    <a-form-model-item label="设备类型">
      <a-select
      :disabled='true'
      style="width: 194px"
      v-model="eqmInfo.productTypeName"
      >
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="所在分店">
      <a-select
        style="width: 194px;"
        :disabled='true'
        v-model="eqmInfo.shopName"
      >
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="设备状态">
      <a-input
      :disabled='true'
      v-model="eqmInfo.enableName"
      />
    </a-form-model-item>
    <a-form-model-item label="网络状态">
      <a-input
      :disabled='true'
      v-model="eqmInfo.onlineStatusName"
      />
    </a-form-model-item>
    <a-form-model-item label="门号" v-if="this.eqmInfo.productTypeName === '门禁'">
      <a-input

      />
    </a-form-model-item>
    <div class="back_btu">
      <a-button style="margin-left: 10px" @click="getback">返回</a-button>
    </div>
  </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      eqmInfo: {}, // 设备信息
    };
  },
  created() {
    this.eqmInfo = JSON.parse(sessionStorage.getItem('equInfo'));
  },
  activated() {
    this.eqmInfo = JSON.parse(sessionStorage.getItem('equInfo'));
  },
  methods: {
    getback() {
      sessionStorage.removeItem('equInfo');
      this.$nextTick(() => this.$router.back());
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
/deep/ .ant-form-inline .ant-form-item {
    display: inline-block;
    margin:5px 70px;
    margin-bottom: 0;
}
.back_btu{
    text-align: center;
}
</style>
