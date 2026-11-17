<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "PingFang SC", "Microsoft YaHei", -apple-system, "Segoe UI", sans-serif;
  background: #fff9ec;
  color: #303133;
  -webkit-font-smoothing: antialiased;
}
/* 细一点的滚动条，看起来更精致 */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-thumb { background: #e3d5ae; border-radius: 8px; }
::-webkit-scrollbar-track { background: transparent; }
button, input, select { font-family: inherit; }
</style>
