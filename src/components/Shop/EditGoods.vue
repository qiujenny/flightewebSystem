<template>
  <a-modal
    width="50%"
    class="edit-goods"
    :visible="visible"
    title="编辑商品"
    @cancel="$emit('close')"
  >
    <a-row :gutter="30" class="container">
      <a-col :span="12" :offset="1">
         <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="名称">
            <a-input
              v-decorator="['whsGoodsName', { rules: [{ required: true, message: '请输入商品名称' }] }]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="单位">
            <a-select
              v-decorator="[
                'pkg',
                { rules: [{ required: true, message: '请选择单位' }] },
              ]"
              placeholder="请选择"
              :options="pkgList"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="规格">
            <a-input-number
              v-decorator="['pkgQty', { rules: [{ required: true, message: '请输入规格' }] }]"
              :max="99999"
              :min="1"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="价格">
            <a-input-number
              v-decorator="['whsPrice', { rules: [{ required: true, message: '请输入价格' }] }]"
              :max="99999"
              :min="0.01"
              :precision="2"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="图片">
            <a-upload
              accept="image/*"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
              :customRequest="handleUpload"
            >
              <a-button :loading="loading" type="primary">重选图片</a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="11" style="text-align: center;">
        <img :src="imgUrl" alt="" class="goods-img">
      </a-col>
    </a-row>
    <div slot="footer">
      <a-button @click="$emit('close')">取消</a-button>
      <a-button type="primary" :loading="subLoading" @click="handleSubmit">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex';
import Api from '@/api/publicTools';

export default {
  name: 'EditGoods',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    goodsDetail: {
      type: Object,
      required: true
    },
    shopId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'editGoods' }),
      shortCode: '',
      loading: false,
      fileUrlHeader: Api.fileUrlHeader(),
      pkgList: [
        { value: '箱', label: '箱' },
        { value: '件', label: '件' },
        { value: '瓶', label: '瓶' },
        { value: '包', label: '包' },
        { value: '个', label: '个' },
      ],
      subLoading: false,
    };
  },
  watch: {
    goodsDetail: {
      deep: true,
      immediate: true,
      handler(data) {
        if (data) {
          const { whsGoodsName, pkg, pkgQty, whsPrice } = data;
          this.$nextTick(() => {
            this.form.setFieldsValue({
              whsGoodsName,
              pkg,
              pkgQty,
              whsPrice
            });
          });
        }
      }
    }
  },
  computed: {
    imgUrl() {
      const { whsSkuImgurl } = this.goodsDetail;
      let url = whsSkuImgurl.indexOf('http://') > -1 ? whsSkuImgurl : this.fileUrlHeader + whsSkuImgurl;
      if (this.shortCode) url = this.fileUrlHeader + this.shortCode;
      return url;
    }
  },
  methods: {
    ...mapActions(['uploadPicAction', 'saveGoodsAction']),
    handleChange(info) {
      if (info.file.status === 'uploading') this.loading = true;
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('请上传.jpeg, .png类型图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('请上传小于2M的图片');
      }
      return isJpgOrPng && isLt2M;
    },
    handleUpload(file) {
      const formData = new FormData();
      formData.append('uploadFile', file.file);
      formData.append('serFunCode', 8012101);
      this.uploadPicAction(formData)
        .then(res => {
          if (res.code === 200) {
            const { shortCode } = res.data;
            this.shortCode = shortCode;
          } else {
            this.$message.error('图片上传失败');
            this.shortCode = null;
          }
          this.loading = false;
        });
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const { userId, userName } = this.$store.state.user;
          const { skuId, whsGoodsId, picCode } = this.goodsDetail;
          const payload = {
            ...values,
            skuId,
            whsGoodsId,
            shopId: this.shopId,
            picCode: this.shortCode || picCode,
            userId,
            userName
          };
          this.subLoading = true;
          this.saveGoodsAction([{ ...payload }]).then(res => {
            if (res.code === 200) {
              this.$message.success('保存成功');
              this.$emit('close');
              this.$emit('reload');
            } else {
              this.$message.error(res.msg);
            }
            this.subLoading = false;
          });
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.edit-goods {
  .ant-row.container {
    height: 310px;
    .goods-img {
      display: inline-block;
      width: 200px;
      height: 200px;
    }
  }
}
</style>
