<template>
  <div class="menu">
    <!--<a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">-->
      <!--<a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />-->
    <!--</a-button>-->
    <a-menu
      mode="inline"
      theme="dark"
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      @click='select'
      ref="menuLay"
      @openChange='openChange'
    >
      <template v-for="(item) in menuList">
        <a-menu-item v-if="!item.children" :key="item.name">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu :key="item.name" v-else>
          <span slot="title">
            <a-icon :type="item.meta.icon" /><span>{{ item.meta.title }}</span>
          </span>
          <template v-for="child in item.children">
            <a-menu-item v-if="!child.children && !child.meta.hide" :key="`/${child.name}`" @click="changeTags(child)">
              <!--<a-icon :type="child.meta.icon" />-->
              <!--<span>{{ child.meta.title }}</span>-->
              <router-link :to="child.path">
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
// import routersCommon from '../../router/routersCommon';

export default {
  name: 'Menus',
  computed: {
    menuList() {
      return this.$store.state.app.menuList[0].children;
    }
  },
  data() {
    return {
      // menuList: this.$store.state.menuList[0].children,
      selectedKeys: [this.$route.path.substr(this.$route.path.lastIndexOf('/'))],
      openKeys: [this.$route.meta.fatherName],
      rootSubmenuKeys: ['/Platform', '/userManagement'], // 有几个子菜单项就贴几个
    };
  },
  methods: {
    ...mapMutations(['addTag']),
    // routerPush(router) {
    //   this.$router.push(router.name);
    // },
    select({ item, key }) { // 选中项
      this.selectedKeys = [key] || [`/${item.name}`];
      item.meta && this.$refs.menuLay.handleOpenChange([item.meta.fatherName]);
    },
    openChange(openKeys) { // 只展开一个子菜单
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    changeTags(tag) {
      this.addTag(tag);
    }
  },
};
</script>

<style scoped>
.menu .ant-menu-item > a {
  color: #fff !important;
  display: inline-block !important;
  width: 70%;
}
</style>
