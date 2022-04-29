<template>
  <div class="layout" style="overflow: hidden">
    <Layout />
  </div>
</template>

<script>

import Layout from '@/components/Layout';

export default {
  name: 'Main',
  components: {
    Layout
  },
  created() {
  }
};
</script>

<style lang="less">
  .ant-layout-content {
    margin: 0 !important;
  }
  .main-padding {
    background: #fff;
    margin-top: 24px;
    padding: 15px;
    .gutter-box {
      display: table;
      width: 100%;
      border-collapse: separate;
      position: relative;
      font-size: 12px;
      top: 1px;
      .gutter-box-label {
        padding: 4px 10px;
        font-size: inherit;
        font-weight: 400;
        line-height: 1;
        color: #515a6e;
        text-align: center;
        background-color: #f8f8f9;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        border-right: 0;
        display: table-cell;
        min-width: 80px;
      }
    }
    .tableContainer {
      margin-top: 20px;
      .tableBtn {
        margin-bottom: 20px;
      }
    }
  }
</style>
