<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { store } from './store'
onMounted(() => document.body.classList.toggle('dark', store.dark))
</script>
