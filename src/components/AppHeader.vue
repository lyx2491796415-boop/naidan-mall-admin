<template>
  <header class="topbar">
    <button class="collapse" @click="$emit('toggle')" aria-label="折叠菜单">
      <span></span><span></span><span></span>
    </button>
    <div class="crumb"><span>工作台</span><b>/</b><strong>{{ title }}</strong></div>

    <div class="top-actions">
      <div class="search">
        <Icon name="search" :size="17" />
        <input v-model="q" placeholder="搜索页面…" @keyup.enter="go" />
        <kbd>↵</kbd>
      </div>
      <button class="icon-btn" @click="toggleTheme" :title="store.dark ? '切换浅色' : '切换深色'">
        <Icon :name="store.dark ? 'sun' : 'moon'" :size="19" />
      </button>
      <button class="icon-btn bell" title="消息">
        <Icon name="bell" :size="19" /><i></i>
      </button>
      <div class="profile">
        <Mascot mood="happy" :size="38" />
        <div class="who"><strong>奶娃</strong><span>超级管理员</span></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '../store'
import Icon from './Icon.vue'
import Mascot from './Mascot.vue'

const router = useRouter()
const route = useRoute()
const q = ref('')
defineEmits(['toggle'])

const titles = {
  '/home/dashboard': '经营概览', '/home/users': '用户管理', '/home/rights': '权限管理',
  '/home/goods': '商品管理', '/home/orders': '订单管理', '/home/settings': '系统设置',
  '/home/memes': '奶娃表情馆'
}
const title = computed(() => titles[route.path] || '工作台')

const go = () => {
  const k = q.value.trim()
  const map = { 概览: 'dashboard', 首页: 'dashboard', 用户: 'users', 权限: 'rights', 商品: 'goods', 订单: 'orders', 设置: 'settings', 表情: 'memes' }
  const hit = Object.entries(map).find(([key]) => k.includes(key))
  if (hit) router.push('/home/' + hit[1])
  else if (k) router.push('/home/users')
  q.value = ''
}
const toggleTheme = () => { store.dark = !store.dark }
</script>

<style scoped>
.topbar {
  height: 66px; flex-shrink: 0; background: var(--card); border-bottom: 1px solid var(--line);
  display: flex; align-items: center; gap: 18px; padding: 0 26px; position: sticky; top: 0; z-index: 20;
}
.collapse { width: 34px; height: 34px; border: none; background: transparent; display: grid; gap: 4px; align-content: center; border-radius: 8px; }
.collapse:hover { background: var(--bg-soft); }
.collapse span { display: block; height: 2px; background: var(--muted); border-radius: 2px; }
.collapse span:nth-child(2) { width: 70%; }
.crumb { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--muted); }
.crumb b { opacity: .4; font-weight: 400; }
.crumb strong { color: var(--ink); font-weight: 600; }
.top-actions { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.search { display: flex; align-items: center; gap: 8px; background: var(--bg-soft); border: 1px solid transparent; padding: 8px 12px; border-radius: 10px; color: var(--muted); }
.search:focus-within { border-color: var(--gold-3); background: var(--card); }
.search input { border: none; background: transparent; outline: none; width: 170px; font-size: 13px; }
.search kbd { font-size: 11px; border: 1px solid var(--line); border-radius: 4px; padding: 0 5px; color: var(--muted); }
.icon-btn { position: relative; width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--line); background: var(--card); display: grid; place-items: center; color: var(--muted); transition: .18s; }
.icon-btn:hover { color: var(--gold-4); border-color: var(--gold-3); }
.bell i { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; background: var(--danger); border-radius: 50%; border: 1.5px solid var(--card); }
.profile { display: flex; align-items: center; gap: 9px; padding-left: 12px; border-left: 1px solid var(--line); }
.who { display: flex; flex-direction: column; line-height: 1.3; }
.who strong { font-size: 13px; }
.who span { font-size: 11px; color: var(--muted); }
@media (max-width: 900px) { .search, .who { display: none; } }
</style>
