<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-form">
        <div class="login_logo">航班信息管理系统</div>
        <div class="form_box">
          <login-form
            @on-success-valid="handleSubmit"
            :identifyCode="identifyCode"
            :loading="loadingSubmit"
          >
          </login-form>
        </div>
      </div>
    </div>
    <div class="login-copyright"></div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { baseRouter_path } from '@/libs/comment';
import LoginForm from '../../components/login-form/login-form';
import './login.less';
import routersCommon from '../../router/routersCommon';

export default {
  name: 'login',
  components: {
    LoginForm
  },
  data() {
    return {
      identifyCode: { code: '', flag: '' },
      loadingSubmit: false,
    };
  },
  created() {

  },
  mounted() {
    sessionStorage.clear();
  },

  methods: {
    ...mapActions(['handleLogin', 'getUserInfo', 'handleSetMenuList', 'getLoginValidateCode', 'addTag']),
    ...mapMutations(['addTag']),
    handleSubmit({ loginName, loginPw, validateCode, flag }) {
      this.loadingSubmit = true;
      this.$router.push({ name: 'users' });
      this.addTag({
        path: `${baseRouter_path}users`,
        name: 'users',
        meta: {
          title: '帐户管理',
          fatherName: 'userManagement',
        },
      });
      this.handlePrivilegeMenu(true);
      // const payload = { loginName: loginName.trim(), loginPw, validateCode, flag };
      // this.handleLogin(payload).then(response => {
      //   console.log(response);
      //   // this.$router.push({ name: 'users' });
      //   // this.addTag({
      //   //   path: `${baseRouter_path}users`,
      //   //   name: 'users',
      //   //   meta: {
      //   //     title: '帐户管理',
      //   //     fatherName: 'userManagement',
      //   //   },
      //   // });
      //   this.getUserInfomation();
      // }).catch(() => {
      //   this.loadingSubmit = false;
      // });
    },

    // 用户信息
    getUserInfomation() {
      this.getUserInfo().then(res => {
        this.loadingSubmit = false;
        console.log(res, 'data');
        if (res.roles && res.roles.length) {
          const idList = [];
          res.roles.map(item => idList.push(item.id));
          // 超级管理员判断系统管理员id永远是1
          const status = idList.includes(1);
          // status为true 当前登录人包含系统管理员角色
          // 处理菜单权限
          this.handlePrivilegeMenu(status);
        } else {
          this.messageError();
        }
      });
    },

    handlePrivilegeMenu(status) {
      // this.$router.push({ name: path });
      // 非系统管理员没有平台管理层权限
      // if (!status) {
      //   routersCommon[0].children[0].children.forEach((item, index) => {
      //     if (item.name !== 'memberShip') {
      //       routersCommon[0].children[0].children.splice(index, 1);
      //     }
      //   });
      // }
      const routersMenus = routersCommon;
      this.handleSetMenuList(routersMenus);
      this.$router.push({ name: routersMenus[0].children[0].children[0].name });
      this.addTag(routersMenus[0].children[0].children[0]);
    },

    getIdentifyCode() {
      this.getLoginValidateCode()
        .then(res => {
          this.identifyCode = {};
          this.identifyCode.code = res.data;
          this.identifyCode.flag = res.flag;
        })
        .catch(() => {
        });
    },

    messageError(url = null) {
      this.$message.error('没有页面权限，请联系管理员。');
      sessionStorage.clear();
      setTimeout(() => {
        if (url) {
          window.location.href = url;
        } else {
          window.location.reload();
        }
      }, 500);
    },
  },
};
</script>

<style scoped lang="less">
  .login-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../assets/images/loginImg/login_bg.png') no-repeat center center;
    background-size: cover;
    .login-box {
      width: 1200px;
      height: 645px;
      .login-form {
        color: #fff;
        width: 400px;
        margin: 0 auto;
        background: #082761;
        opacity: 0.8;
        padding: 0 20px 20px;
        text-align: center;
        .login_logo {
          width: 100%;
          height: 75px;
          background-size: 100% 100%;
          padding-top: 20px;
          font-size: 20px;
          color: #fff;
          border-bottom: 1px solid;
        }
      }
    }
    .login-copyright {
      position: absolute;
      top: 700px;
      width: 100%;
      text-align: center;
      color: #555;
      a {
        color: #555;
      }
    }
  }
</style>
