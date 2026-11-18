<template>
  <aside class="sidebar" :class="{ mini: collapsed }">
    <router-link to="/home/dashboard" class="brand">
      <Mascot mood="cool" :size="42" />
      <div v-if="!collapsed" class="brand-text"><strong>奶娃商城</strong><span>ADMIN CONSOLE</span></div>
    </router-link>

    <nav class="nav">
      <div v-if="!collapsed" class="nav-label">工作台</div>
      <router-link to="/home/dashboard" class="nav-item"><Icon name="grid" :size="19" /><span>经营概览</span></router-link>

      <div v-if="!collapsed" class="nav-label">业务管理</div>
      <router-link to="/home/users" class="nav-item"><Icon name="users" :size="19" /><span>用户管理</span></router-link>
      <router-link to="/home/rights" class="nav-item"><Icon name="shield" :size="19" /><span>权限管理</span></router-link>
      <router-link to="/home/goods" class="nav-item"><Icon name="box" :size="19" /><span>商品管理</span></router-link>
      <router-link to="/home/orders" class="nav-item"><Icon name="cart" :size="19" /><span>订单管理</span><em class="dot">4</em></router-link>

      <div v-if="!collapsed" class="nav-label">系统</div>
      <router-link to="/home/memes" class="nav-item"><Icon name="mood" :size="19" /><span>奶娃表情馆</span><em class="new">NEW</em></router-link>
      <router-link to="/home/settings" class="nav-item"><Icon name="settings" :size="19" /><span>系统设置</span></router-link>
    </nav>

    <div v-if="!collapsed" class="side-card">
      <Mascot mood="love" :size="54" />
      <strong>今天也要元气满满</strong>
      <p>点击右上角图标可切换深浅主题</p>
    </div>
    <button class="logout" @click="logout"><Icon name="logout" :size="18" /><span v-if="!collapsed">退出登录</span></button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Icon from './Icon.vue'
import Mascot from './Mascot.vue'
defineProps({ collapsed: Boolean })
const router = useRouter()
const logout = () => { localStorage.removeItem('token'); router.push('/login') }
</script>

<style scoped>
.sidebar {
  width: 232px; flex-shrink: 0; background: var(--sidebar); color: var(--sidebar-text);
  display: flex; flex-direction: column; padding: 18px 14px; transition: width .25s; overflow: hidden;
}
.sidebar.mini { width: 74px; }
.brand { display: flex; align-items: center; gap: 11px; padding: 4px 8px 20px; }
.brand-text { display: flex; flex-direction: column; white-space: nowrap; }
.brand-text strong { color: #fff; font-size: 17px; letter-spacing: .5px; }
.brand-text span { font-size: 9px; letter-spacing: 2px; color: #6f7787; margin-top: 2px; }
.nav { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.nav-label { font-size: 10px; letter-spacing: 1.5px; color: #5f6778; margin: 16px 10px 6px; }
.nav-item {
  display: flex; align-items: center; gap: 13px; height: 43px; padding: 0 12px; border-radius: 10px;
  color: var(--sidebar-text); font-size: 13.5px; white-space: nowrap; position: relative; transition: .18s;
}
.nav-item:hover { background: rgba(255, 255, 255, .06); color: #fff; }
.nav-item.router-link-exact-active { background: linear-gradient(90deg, rgba(237, 166, 42, .22), rgba(237, 166, 42, .05)); color: #ffcf72; font-weight: 600; }
.nav-item.router-link-exact-active::before { content: ''; position: absolute; left: 0; top: 11px; bottom: 11px; width: 3px; border-radius: 3px; background: var(--gold-4); }
.nav-item em { margin-left: auto; font-style: normal; font-size: 10px; }
.dot { background: var(--danger); color: #fff; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; }
.new { color: #0d1b12; background: #7ee2a8; padding: 2px 6px; border-radius: 5px; font-weight: 700; }
.side-card { background: linear-gradient(160deg, #2c3240, #232833); border: 1px solid #343b4a; border-radius: 14px; padding: 16px 12px; text-align: center; margin-bottom: 12px; }
.side-card :deep(.mascot) { margin: 0 auto 6px; }
.side-card strong { display: block; color: #fff; font-size: 12.5px; }
.side-card p { font-size: 10.5px; color: #7f8797; margin-top: 5px; line-height: 1.5; }
.logout { display: flex; align-items: center; gap: 13px; height: 42px; padding: 0 12px; border: none; background: transparent; color: #8e96a6; font-size: 13.5px; border-radius: 10px; }
.logout:hover { background: rgba(229, 72, 77, .12); color: #ff8a8d; }
.mini .nav-item, .mini .logout { justify-content: center; padding: 0; }
</style>
