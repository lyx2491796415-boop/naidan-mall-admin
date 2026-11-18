<template>
  <div class="stat rise" :style="{ animationDelay: delay }">
    <div class="stat-top">
      <span class="stat-label">{{ label }}</span>
      <span class="stat-ico" :style="{ background: tint, color }"><Icon :name="icon" :size="19" /></span>
    </div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-foot">
      <span v-if="trend" class="trend" :class="trend.startsWith('-') ? 'down' : 'up'">
        {{ trend.startsWith('-') ? '↓' : '↑' }} {{ Math.abs(trend).replace('-', '') }}%
      </span>
      <span class="stat-sub">{{ sub }}</span>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'
defineProps({
  label: String, value: [String, Number], sub: { type: String, default: '较上月' },
  icon: { type: String, default: 'chart' }, color: { type: String, default: '#eda62a' },
  tint: { type: String, default: '#fff3d9' }, trend: { type: String, default: '' },
  delay: { type: String, default: '0s' }
})
</script>

<style scoped>
.stat {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md);
  padding: 20px 22px; box-shadow: var(--shadow-sm); transition: transform .2s, box-shadow .2s;
}
.stat:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.stat-top { display: flex; justify-content: space-between; align-items: flex-start; }
.stat-label { font-size: 13px; color: var(--muted); font-weight: 500; }
.stat-ico { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; }
.stat-value { font-size: 30px; font-weight: 700; letter-spacing: -.5px; margin: 10px 0 6px; }
.stat-foot { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.trend { font-weight: 700; padding: 2px 7px; border-radius: 6px; }
.trend.up { color: var(--ok); background: rgba(22, 185, 129, .12); }
.trend.down { color: var(--danger); background: rgba(229, 72, 77, .12); }
.stat-sub { color: var(--muted); }
</style>
