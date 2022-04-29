<template>
  <a-form ref="loginForm" :form="loginForm" :rules="rules" class="form-content" @keydown.native.enter.prevent ="handleSubmit">
    <a-form-item v-bind="form.userName">
      <!--<a-input v-model="form.userName" size="large"-->
             <!--placeholder="用户名不能为空"-->
             <!--style="width: auto">-->
        <!--<a-icon type="user" slot="prefix" />-->
      <!--</a-input>-->
      <a-input
        style="width: auto"
        placeholder="请输入用户名"
        v-decorator="[
          'userName',
          {
            rules: [
              {
                required: true,
                message: '用户名不能为空',
              },
            ],
          },
        ]"
      >
        <a-icon type="user" slot="prefix" />
      </a-input>
    </a-form-item>
    <a-form-item v-bind="form.password">
      <a-input
        style="width: auto"
        placeholder="请输入密码"
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '密码不能为空',
              },
            ],
          },
        ]"
        type="password"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-row :gutter="16">
        <a-col span="12" :offset="4">
          <a-button @click="handleSubmit" v-if="!loadingSubmit" type="primary" long style="text-align: center;margin-top: 28px;" class="input_submit">
            登录
          </a-button>
          <a-button :loading="loadingSubmit" v-else type="primary" long style="text-align: center;margin-top: 28px;" class="input_submit">
            正在登录...
          </a-button>
        </a-col>
      </a-row>
      <span class="forgetPassword">忘记密码？</span>
    </a-form-item>
  </a-form>
</template>
<script>
// import SIdentify from '../identify/identify';

export default {
  name: 'LoginForm',
  // components: {
  //   SIdentify
  // },
  props: {
    userNameRules: {
      type: Array,
      default: () => [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    passwordRules: {
      type: Array,
      default: () => [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // loadingSubmit: false,
      form: {
        userName: '',
        password: '',
      },
      loginForm: this.$form.createForm(this, { name: 'login' }),
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    },
    loadingSubmit() {
      return this.loading;
    }
  },
  methods: {
    handleSubmit() {
      this.loginForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { password, userName } = values;
          console.log('Received values of form: ', values);
          this.$emit('on-success-valid', {
            loginName: userName,
            loginPw: password,
            loading: true
          });
        }
      });
    }
  }
};
</script>
