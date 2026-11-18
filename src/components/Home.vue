<template>
  <div class="layout">
    <AppSidebar :collapsed="collapsed" />
    <div class="main">
      <AppHeader @toggle="collapsed = !collapsed" />
      <main class="content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in"><component :is="Component" /></transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
const collapsed = ref(false)
</script>

<style scoped>
.layout { display: flex; height: 100vh; overflow: hidden; }
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.content { flex: 1; overflow: auto; padding: 26px 30px 40px; }
@media (max-width: 700px) { .content { padding: 18px 16px 30px; } }
</style>
