<template>
  <div class="home-container">
    <MyHeader />
    <div class="home-main-box">
      <MyAside />
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyHeader from './subcomponent/MyHeader.vue'
import MyAside from './subcomponent/MyAside.vue'
</script>

<style lang="less">
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff9ec;
}
.home-main-box {
  flex: 1;
  display: flex;
  min-height: 0;
}
.home-main-body {
  flex: 1;
  overflow: auto;
  min-width: 0;
}
</style>
