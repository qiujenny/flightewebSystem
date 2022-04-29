<template>
  <div class="tags-nav" style="{ height: 44px;lineHeight: 44px }">
    <div v-show="list.length > tagCountMark" class="btn-con left-btn">
      <a-icon type="left" @click="handleScroll(240)" style="{ marginTop: '10px' }" />
      <!--<Button icon="ios-arrow-back" type="text" @click="handleScroll(240)"></Button>-->
    </div>
    <div class="btn-con right-btn">
      <a-icon v-show="list.length > tagCountMark" type="right" @click="handleScroll(-240)" style="{marginTop: '10px'}" />
      <!--<Button icon="ios-arrow-forward" type="text" @click="handleScroll(-240)"></Button>-->
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <a-tag
              v-for="(item, index) in list"
              ref="tagsPageOpened"
              :key="`tag-nav-${item.name}`"
              :name="item.name"
              @close="handleClose(item.name)"
              @click.native="handleClick(item)"
              :closable="index === 0 ? false : true"
              :color="item.name === value.name ? 'blue' : 'default'"
          >{{ showTitleInside(item) }}
          </a-tag>
        </transition-group>
      </div>
      <gkcontextmenu class="right-menu"
                     :target="contextMenuTarget"
                     :show="contextMenuVisible"
                     @update:show="(show) => contextMenuVisible = show">
        <div class="ivu-select-dropdown">
          <ul class="ivu-dropdown-menu">
            <li class="ivu-dropdown-item"><a href="javascript:;" class="item"
                                             @click="handleTagsOption('close-all')">关闭所有</a></li>
            <li class="ivu-dropdown-item"><a href="javascript:;" class="item"
                                             @click="handleTagsOption('close-others')">关闭其他</a></li>
          </ul>
        </div>
        <!--<a href="javascript:;" @click="deleteMsg">删除</a>-->
      </gkcontextmenu>
    </div>
  </div>
</template>

<script>
import { showTitle } from '@/libs/until';
import gkcontextmenu from '../context-memu/gkContextMenu';

export default {
  name: 'TagsNav',
  components: {
    gkcontextmenu
  },
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 5,
      contextMenuTarget: null,
      contextMenuVisible: false,
      tagCountMark: document.body.clientWidth > 1440 ? 9 : 7 // Rick0830
    };
  },
  watch: {
    // Rick监听菜单tag变化，位移
    list(newVal, oldVal) {
      if (newVal.findIndex(i => i.name === this.value.name) < 3) {
        // 如果是前面三个菜单tag
        this.tagBodyLeft = 5;
      } else {
        // tag菜单超过9个
        const NUM = this.tagCountMark;
        if (newVal.length > NUM) {
          this.tagBodyLeft = -(newVal.length - NUM) * 100;
        }
      }
    }
  },
  methods: {
    // R_F
    hasClose(val) {
      const result = true;

      return result;
    },
    handlescroll(e) {
      const { type } = e;
      let delta = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else if (
        this.$refs.scrollOuter.offsetWidth < this.$refs.scrollBody.offsetWidth
      ) {
        if (
          this.tagBodyLeft
            < -(
              this.$refs.scrollBody.offsetWidth
              - this.$refs.scrollOuter.offsetWidth
            )
        ) {
          this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(
            this.tagBodyLeft + offset,
            this.$refs.scrollOuter.offsetWidth
                - this.$refs.scrollBody.offsetWidth
          );
        }
      } else {
        this.tagBodyLeft = 0;
      }
    },
    handleTagsOption(type) {
      if (type === 'close-all') {
        // 关闭所有，除了home
        const res = this.list.filter(item => item.name === 'home');
        this.$emit('on-close', res, 'all');
        this.contextMenuVisible = false;
      } else {
        // 关闭除当前页和home页的其他页
        const res = this.list.filter(
          item => item.name === this.value.name || item.name === 'home'
        );
        this.$emit('on-close', res, 'others');
        this.contextMenuVisible = false;
      }
    },
    handleClose(name) {
      const res = this.list.filter(item => item.name !== name);
      // RICK_CACHE_start
      const closeTargetRoute = this.list.find(item => item.name === name);
      // 创建计划页面清除 outDate 的缓存
      if (name === 'createPlan') {
        sessionStorage.outDate ? sessionStorage.removeItem('outDate') : '';
      }
      console.log(closeTargetRoute, 'closeTargetRoute');
      this.$emit('on-close', res, undefined, name, closeTargetRoute.meta.fatherName);
      // RICK_CACHE_end
    },
    handleClick(item) {
      this.$emit('input', item);
    },
    showTitleInside(item) {
      return showTitle(item, this);
    }
  },
  mounted() {
    this.contextMenuTarget = this.$refs.scrollOuter;
  }
};
</script>

<style lang="less">
@import "./tags-nav.less";
</style>
