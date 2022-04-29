<!--
 * @Autor: nvzhen.qiu
 * @Date: 2022-03-09 15:30:36
 * @LastEditors: nvzhen.qiu
 * @LastEditTime: 2022-03-09 15:53:24
 * @Description: 
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
  }
</style>
