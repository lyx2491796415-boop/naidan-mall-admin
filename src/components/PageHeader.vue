<template>
  <div class="ph">
    <div class="ph-text">
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="ph-actions"><slot /></div>
  </div>
</template>

<script setup>
defineProps({ title: String, subtitle: String })
</script>

<style scoped>
.ph { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
.ph h1 { font-size: 24px; font-weight: 700; letter-spacing: -.4px; }
.ph p { color: var(--muted); font-size: 13.5px; margin-top: 5px; }
.ph-actions { display: flex; gap: 10px; flex-wrap: wrap; }
</style>
