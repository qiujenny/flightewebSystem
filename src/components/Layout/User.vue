<template>
  <div class="user-avator-dropdown">
    <a-dropdown>
      <a class="ant-dropdown-link" style="color: #333;">
        <a-avatar shape="square" :src="userAvator" style="margin-top:-3px" ></a-avatar>
        <span style="display: inline-block;height:28px;line-height: 28px;font-size: 14px;margin: 0 10px;padding-top:3px">{{ userName }}</span>
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item name="userInFo" @click="handleClick('userInFo')">
          账户信息
        </a-menu-item>
        <a-menu-item name="updatePsw" @click="handleClick('updatePsw')">
          修改密码
        </a-menu-item>
        <a-menu-item name="logout" @click="logout">
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import './user.less';
import { logOut } from '@/api/user';

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  components: {
  
  },
  data() {
    return {
    
    };
  },
  methods: {
    handleClick(type) {
      console.log(type);
      switch (type) {
        case 'userInFo':
          this.$emit('userInFo', 1);
          break;
        case 'updatePsw':
          this.$emit('updatePsw', 2);
          break;
        default:
          break;
      }
    },
    logout() {
      logOut().then(() => {
        sessionStorage.clear();
        // this.$router.push({ name: "login" }); // 无法销毁store里state变量值
        const DOMAIN = process.env.VUE_APP_DOMAIN;
        const loginPath = `/${DOMAIN}/login`;
        window.location.href = loginPath;
      });
    }
  }
};
</script>
