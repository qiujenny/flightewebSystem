<template>
  <a-modal
    width="50%"
    class="goods-detail"
    :visible="visible"
    title="商品详情"
    @cancel="$emit('close')"
  >
    <a-row :gutter="30">
      <a-col :span="12" :offset="1">
        <a-descriptions :column="1">
          <a-descriptions-item label="名称">
            {{goodsDetail.whsGoodsName}}
          </a-descriptions-item>
          <a-descriptions-item label="分类">
            {{goodsDetail.className}}
          </a-descriptions-item>
          <a-descriptions-item label="条码">
            {{goodsDetail.gtin}}
          </a-descriptions-item>
          <a-descriptions-item label="编码">
            {{goodsDetail.skuCode}}
          </a-descriptions-item>
          <a-descriptions-item label="品牌">
            {{goodsDetail.brandName}}
          </a-descriptions-item>
          <a-descriptions-item label="单位">
            {{goodsDetail.pkg}}
          </a-descriptions-item>
          <a-descriptions-item label="规格">
            {{goodsDetail.pkgQty}}
          </a-descriptions-item>
          <a-descriptions-item label="价格">
            ￥{{goodsDetail.whsPrice}}
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="11" style="text-align: center;">
        <img :src="goodsDetail.whsSkuImgurl" alt="" class="goods-img">
      </a-col>
    </a-row>
    <div slot="footer">
      <a-button @click="$emit('close')">返回</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'GoodsDetail',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    goodsDetail: {
      type: Object,
      required: true
    }
  },
};
</script>

<style lang="less" scoped>
.goods-detail {
  .ant-row {
    height: 310px;
    .goods-img {
      display: inline-block;
      width: 200px;
      height: 200px;
    }
  }
}
</style>
