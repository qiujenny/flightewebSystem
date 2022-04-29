<template>
  <div>
    <!--修改密码-->
    <a-modal
      v-model="visible"
      title="修改密码"
      width="35%"
      @cancel="close()"
      :maskClosable="false">
      <a-form :form="modifyPswForm" :label-width="80" ref="upPswListInfoFrom" :rules="upPswListInfoRules">
        <a-row :gutter="16">
          <a-col span="12">
            <a-form-item prop="loginName" label="账户名称">
              <a-input v-model="loginName" readOnly/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item prop="employeeNo" label="工号">
              <a-input v-model="employeeNo" readOnly/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="m-t-10">
          <a-col span="24">
            <a-form-item prop="oldPw" label="原始密码">
              <a-input
                type="password"
                placeholder="请输入密码"
                v-decorator="[
                  'oldPw',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入原始密码',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="m-t-10">
          <a-col span="24">
            <a-form-item prop="loginPw" label="登录密码">
              <a-input
                type="password"
                v-decorator="['loginPw', upPswListInfoRules.loginPw]"
                placeholder="请输入密码"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="m-t-10">
          <a-col span="24">
            <a-form-item prop="loginPw2" label="确认密码">
              <a-input
                type="password"
                placeholder="请输入确认密码"
                v-decorator="['loginPw2', upPswListInfoRules.loginPw2]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div slot="footer">
        <a-button type="primary" @click="submit()">&nbsp;&nbsp;保存&nbsp;&nbsp;</a-button>
        <a-button class="m-l-10" @click="close()">&nbsp;&nbsp;关闭&nbsp;&nbsp;</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'MainSetPassword',
  props: {
    upPswListInfo: { type: Object, default: null },
    upPswListInfoRules: { type: Object, default: null },
    loginName: { type: String, default: '' },
    employeeNo: { type: String, default: '' },
    updatePassword: { type: Function },
    closeModal: { type: Function },
  },
  data() {
    return {
      visible: true,
      modifyPswForm: this.$form.createForm(this, { name: 'modifyPsw' }),
    };
  },
  methods: {
    close() {
      this.modifyPswForm.resetFields();
      console.log('resetFields');
      this.closeModal();
    },
    submit() {
      this.modifyPswForm.validateFieldsAndScroll((err, values) => {
        console.log(err, values);
        const { loginPw, loginPw2 } = values;
        if (loginPw === loginPw2) {
          if (!err) {
            this.updatePsw = false;
            this.updatePassword(values);
          }
        } else {
          this.$message.error('两次输入密码不一致，请重新输入');
        }
      });
    }
  }
};
</script>
