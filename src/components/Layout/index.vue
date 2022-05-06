<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" />
      <Menu ref="menu"></Menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
        <div style="position: relative;">
          <!-- <div>logo</div> -->
          <tags-nav
            :value="$route"
            @input="handleClick"
            :list="tagNavList"
            @on-close="handleCloseTag"
            class="main-header-l"
            style="position: relative;">
          </tags-nav>
          <User
          :user-avator="userAvator"
          :user-name="userName"
          class="main-header-r"
          @userInFo="userInFo"
          @updatePsw="updatePsw"
          style="position: absolute; line-height: 46px; top: 0; right: 10px;"
          >
          </User>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <keep-alive>
          <router-view :exclude="$store.state.excludeRoute"></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>

    <!--查看账户-->
    <template v-if="userInfoList">
      <main-user-info
        :roleList="roleList"
        :loginName="loginName"
        :employeeNo="employeeNo"
        :weixinId="weixinId"
        :phone="phone"
        :email="email"
        :qq="qq"
        :isService="isService"
        :userName="userName"
        :closeModal="userInFoClose"
      />
    </template>

    <!--修改密码-->
    <template v-if="upPswList">
      <main-set-password
        :upPswListInfo="upPswListInfo"
        :upPswListInfoRules="upPswListInfoRules"
        :updatePassword="updatePassword"
        :closeModal="resetForm"
        :loginName="loginName"
        :employeeNo="employeeNo"
      />
    </template>
  </a-layout>
</template>

<script>
import User from '@/components/Layout/User';
// import Head from './Head'
import { mapMutations, mapActions } from 'vuex';
import TagsNav from '@/components/tags-nav/tags-nav';
import { treeChangeList } from '@/libs/tools';
import Menu from './Menus';
import { updatePassword, logOut } from '../../api/user';

const MainSetPassword = () => import(/* webpackChunkName: 'MainSetPassword' */'./MainSetPassword');
const MainUserInfo = () => import(/* webpackChunkName: 'MainUserInfo' */'./MainUserInfo');

export default {
  name: 'Layout',
  components: {
    Menu,
    TagsNav,
    User,
    MainSetPassword,
    MainUserInfo
    // Head
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    menuList() {
      return this.$store.state.user.userMenuList[0].children;
    },
    userName() {
      if (sessionStorage.loginUserName && sessionStorage.loginUserName.length > 5) {
        return `${sessionStorage.loginUserName.substring(0, 5)}...`;
      } else {
        return sessionStorage.loginUserName;
      }
    },
    loginName() {
      return this.$store.state.user.loginName;
    },
    employeeNo() {
      return this.$store.state.user.employeeNo;
    },
  },
  data() {
    const REG = /^[^\u4e00-\u9fa5]{6,14}$/;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!REG.test(value)) {
        callback(new Error('请输入6-14位英文、数字和特殊符号（不含中文）'));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!REG.test(value)) {
        callback(new Error('请输入6-14位英文、数字和特殊符号（不含中文）'));
      } else {
        callback();
      }
    };
    return {
      upPswList: false,
      userInfoList: false,
      upPswListInfo: {
        oldPw: '',
        loginPw: '',
        loginPw2: '',
        loginName: this.$store.state.user.loginName
      },
      upPswListInfoRules: {
        oldPw: [
          'oldPw',
          {
            rules: [
              {
                required: true,
                message: '请输入原始密码',
              },
            ],
          },
        ],
        loginPw: {
          rules: [{ type: 'string', required: true, validator: validatePass }],
        },
        loginPw2: {
          rules: [{ type: 'string', required: true, validator: validatePassCheck }],
        },
      },
      userAvator: require('../../assets/images/loginImg/man.png'),
      phone: '',
      weixinId: '',
      email: '',
      qq: '',
      isService: null,
      roleList: [],
    };
  },
  mounted() {
    this.setTagNavList();
  },
  methods: {
    ...mapMutations(['setTagNavList', 'addTag', 'setMenuList']),
    ...mapActions(['getUserInfo']),
    turnToPage(name, isPath = '') {
      // RICK_CACHE_start
      const { excludeRoute } = this.$store.state;
      if (excludeRoute.includes(name)) {
        // 不能简写成excludeRoute
        this.$store.state.excludeRoute = excludeRoute.filter(i => i !== name);
      }
      // RICK_CACHE_end

      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      // Rick0830改造，修复切换时路由的params失效而加isPath，即访问路由path即可保留params参数
      this.$router.push(isPath ? { path: name } : { name });
      const vWidth = window.innerWidth;
      if (vWidth < 480 || vWidth === 480) {
        this.isCollapsed = !this.isCollapsed;
      }
    },
    handleCloseTag(res, type, name, fatherName) {
      // RICK_CACHE_start
      const { excludeRoute } = this.$store.state;
      if (!excludeRoute.includes(name)) {
        excludeRoute.push(name);
      }
      const nextRoute = res[res.length - 1];
      const nextRouteName = nextRoute.name;
      this.setTagNavList(res);

      // 对比关闭的tag和它自动切换下的tag的父级是否同一父级
      const isNotTheSameFatherName = fatherName && fatherName !== nextRoute.meta.fatherName;
      if (isNotTheSameFatherName) {
        this.$router.push({ name: fatherName });
      }
      // RICK_CACHE_end

      if (type === 'all') {
        this.turnToPage('home');
      } else if (isNotTheSameFatherName) {
        // Rick_Necessary
        setTimeout(() => {
          this.$router.push({ name: nextRouteName });
        }, 0);
      } else {
        this.$router.push({ name: nextRouteName });
      }
    },
    handleClick(item) {
      // Rick0830改造，修复切换时路由的params失效而加isPath，即访问路由path即可保留params参数
      this.$refs.menu.select({ item, key: `/${item.name}` });
      this.turnToPage(item.path, 'isPath');
    },
    userInFo() {
      // RickPS：登录后接口优化，原queryUserBaseByToken接口里employeeNo、roleList、weixinId、phone的字段数据【0123】
      this.getUserInfo().then(res => {
        console.log(res);
        const { userInfo, roles } = res;
        this.phone = userInfo.phone;
        this.weixinId = userInfo.weixin;
        this.email = userInfo.email;
        this.qq = userInfo.qq;
        this.isService = userInfo.isService;
        this.roleList = roles;
      });
      this.userInfoList = true;
    },
    updatePsw(val) {
      // console.log(val)
      this.upPswList = true;
    },
    userInFoClose() {
      this.userInfoList = false;
    },
    resetForm() {
      this.upPswList = false;
    },
    updatePassword(values) {
      const { oldPw, loginPw, loginPw2 } = values;
      updatePassword({ oldPw, loginPw, loginPw2, loginName: this.upPswListInfo.loginName }).then(res => {
        console.log(this.upPswListInfo);
        if (res) {
          this.$message.success('密码修改成功，请重新登录');
          setTimeout(() => this.logout(), 800);
        }
      });
    },
    logout() {
      logOut(() => {
        sessionStorage.clear();
        this.$router.push({
          name: 'Login'
        });
      });
    },
  }
};
</script>

<style>
  .ant-layout-header {
    height: 44px !important;
  }
</style>
