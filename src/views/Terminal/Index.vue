<template>
  <keep-alive :exclude="$store.state.excludeRoute">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'terminal',
  data() {
    return {
    };
  },
  mounted() {
  }
};
</script>

<style>

</style>
