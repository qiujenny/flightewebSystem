<template>
  <div class="main-padding">
    <div class="add_title"><span class="addTitle_txet">基础信息</span></div>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 4 }">
    <a-form-model-item label="设备编号" prop="eqmSn">
      <a-input
        placeholder="请输入"
        v-model="form.eqmSn"
      />
    </a-form-model-item>
    <a-form-model-item label="设备类型" prop='productTypeName'>
      <a-select
        placeholder="请选择"
        style="width: 120px"
        v-model="form.productTypeName"
        @change="typeChange"
      >
        <a-select-option
        v-for="type in typeList"
        :key="type"
        >
        {{type}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="门号" v-if="this.form.productTypeName === '门禁'" prop='roomNum'>
      <a-input
        v-model="form.roomNum"
        placeholder="请输入"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
      <a-popconfirm @confirm="confirm" :visible="visible">
        <a-button style="margin-left: 10px" type="primary" @click="onSubmit">
         保存
        </a-button>
      </a-popconfirm>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { saveEq } from '../../api/Ems';

export default {
  data() {
    return {
      visible: false,
      typeList: ['中控PC', '收银机', '手持机', '门禁'],
      form: {
        eqmSn: '', // 设备类型初始化
        productTypeName: undefined,
        roomNum: '',
      },
      rules: {
        eqmSn: [{ required: true, message: '请输入设备编号',  trigger: 'change' }],
        productTypeName: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        roomNum: [{ required: true, message: '请输入门号', trigger: 'change' }],
      },
      productTypeId: '', // 设备类型ID
      eqmId: null, // 设备ID
    };
  },
  created() {
    const routeParams = this.$route.query;
    if (routeParams.eqmId) {
      this.eqmId = routeParams.eqmId;
      this.form.eqmSn = routeParams.eqmSn;
      this.form.productTypeName = routeParams.productTypeName;
    }
  },
  activated() {
    const routeParams = this.$route.query;
    if (routeParams.type === 'add') {
      this.form = {
        eqmSn: '', // 设备类型初始化
        productTypeName: undefined,
        roomNum: '',
      };
    }
    if (routeParams.eqmId) {
      this.eqmId = routeParams.eqmId;
      this.form.eqmSn = routeParams.eqmSn;
      this.form.productTypeName = routeParams.productTypeName;
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      message.success('保存成功！');
    },
    // 取消
    cancel() {
      this.$nextTick(() => this.$router.back());
    },
    // 保存
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const query = {
            eqmSn: this.form.eqmSn,
            productTypeId: this.productTypeId,
            eqmId: this.eqmId
          };
          saveEq(query).then(res => {
            // console.log(res.data);
            if (res.code === 200) {
              this.confirm();
              this.$router.push({
                name: 'equipment',
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 选择设备类型
    typeChange(value) {
      this.form.productTypeName = value;
      if (this.form.productTypeName === '中控PC') this.productTypeId = 3;
      else if (this.form.productTypeName === '收银机') this.productTypeId = 4;
      else if (this.form.productTypeName === '手持机') this.productTypeId = 5;
      else if (this.form.productTypeName === '门禁') this.productTypeId = 6;
      else this.productTypeId = '';
    },
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
</style>
