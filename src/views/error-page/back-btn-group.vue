<template>
  <div>
    <a-button size="large" type="text" @click="backHome">返回首页</a-button>
    <a-button size="large" type="text">返回上一页({{ second }}s)</a-button>
  </div>
</template>

<script>
import './error.less';

export default {
  name: 'backBtnGroup',
  data() {
    return {
      second: 5,
      token: '',
      timer: null
    };
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: 'login'
      });
    },
    backPrev() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
