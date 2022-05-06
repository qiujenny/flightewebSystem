<!--
 * @Autor: nvzhen.qiu
 * @Date: 2022-04-29 16:57:12
 * @LastEditors: nvzhen.qiu
 * @LastEditTime: 2022-05-06 11:02:48
 * @Description: 
-->
<template>
  <keep-alive :exclude="$store.state.excludeRoute">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'cost',
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
