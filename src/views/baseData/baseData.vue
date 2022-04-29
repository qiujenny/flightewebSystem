<!--
 * @Autor: nvzhen.qiu
 * @Date: 2022-04-29 11:39:49
 * @LastEditors: nvzhen.qiu
 * @LastEditTime: 2022-04-29 11:54:11
 * @Description: 
-->
<template>
  <keep-alive :exclude="$store.state.excludeRoute">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'baseData'
};
</script>
