<template>
  <div>
    <PageHeader title="权限管理" subtitle="按角色配置系统操作权限，改动实时生效">
      <button class="btn-primary" @click="reset"><Icon name="settings" :size="16" /> 恢复推荐配置</button>
    </PageHeader>

    <div class="stats-grid">
      <StatCard label="权限总数" :value="store.rights.length" icon="shield" color="#eda62a" tint="#fff3d9" />
      <StatCard label="已启用" :value="enabledCount" icon="check" color="#16b981" tint="#dcf7ec" />
      <StatCard label="未启用" :value="store.rights.length - enabledCount" icon="clock" color="#98a0ad" tint="#eef1f4" />
      <StatCard label="启用率" :value="rate + '%'" icon="chart" color="#4c7cf3" tint="#e8f0ff" />
    </div>

    <div class="top-cards">
      <button v-for="r in roles" :key="r" class="role-card" :class="{ active: currentRole === r }" @click="currentRole = r">
        <Mascot :mood="roleMood(r)" :size="46" />
        <div><strong>{{ r }}</strong><small>{{ countOf(r) }} 项权限</small></div>
      </button>
    </div>

    <div class="panel">
      <div class="panel-head"><div><h3>权限清单</h3><p>当前展示：{{ currentRole }}</p></div><span class="hint">切换开关即可启用 / 关闭</span></div>
      <div class="list">
        <div v-for="item in filtered" :key="item.id" class="right-row">
          <span class="r-ico" :class="roleCls(item.role)"><Icon :name="iconFor(item.name)" :size="18" /></span>
          <div class="r-info"><strong>{{ item.name }}</strong><small>{{ item.desc }}</small></div>
          <span class="r-role" :class="roleCls(item.role)">{{ item.role }}</span>
          <span class="r-state" :class="item.enabled ? 'on' : 'off'">{{ item.enabled ? '已启用' : '未启用' }}</span>
          <button class="switch" :class="{ on: item.enabled }" @click="item.enabled = !item.enabled"><i></i></button>
        </div>
        <div v-if="!filtered.length" class="empty">该角色下暂无权限</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import Icon from '../components/Icon.vue'
import Mascot from '../components/Mascot.vue'
import { store } from '../store'

const roles = ['全部', '管理员', '运营', '财务']
const currentRole = ref('全部')
const enabledCount = computed(() => store.rights.filter(r => r.enabled).length)
const rate = computed(() => Math.round(enabledCount.value / store.rights.length * 100))
const filtered = computed(() => currentRole.value === '全部' ? store.rights : store.rights.filter(r => r.role === currentRole.value))
const countOf = r => r === '全部' ? store.rights.length : store.rights.filter(x => x.role === r).length
const roleMood = r => ({ '全部': 'cool', '管理员': 'smug', '运营': 'happy', '财务': 'think' }[r])
const roleCls = r => ({ '管理员': 'ra', '运营': 'rb', '财务': 'rc' }[r])
const iconFor = n => n.includes('用户') ? 'users' : n.includes('商品') ? 'box' : n.includes('订单') ? 'cart' : n.includes('报表') ? 'chart' : n.includes('设置') ? 'settings' : 'shield'
const reset = () => { store.rights.forEach(r => { r.enabled = true }); alert('已恢复为推荐配置') }
</script>

<style scoped>
.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.top-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 18px; }
.role-card { display: flex; align-items: center; gap: 12px; background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 14px 16px; text-align: left; transition: .2s; }
.role-card:hover { transform: translateY(-2px); }
.role-card.active { border-color: var(--gold-4); box-shadow: 0 0 0 2px rgba(237,166,42,.15); }
.role-card :deep(.mascot) { border-radius: 50%; background: var(--gold-1); }
.role-card strong { display: block; font-size: 13.5px; } .role-card small { font-size: 11px; color: var(--muted); }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-sm); overflow: hidden; }
.panel-head { padding: 18px 22px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
.panel-head h3 { font-size: 15px; } .panel-head p { font-size: 12px; color: var(--muted); margin-top: 3px; }
.hint { font-size: 11.5px; color: var(--muted); }
.right-row { display: flex; align-items: center; gap: 14px; padding: 14px 22px; border-bottom: 1px solid var(--line); transition: background .15s; }
.right-row:last-child { border: none; } .right-row:hover { background: var(--bg-soft); }
.r-ico { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; flex-shrink: 0; }
.r-ico.ra { background: #fff0f0; color: #e5484d; } .r-ico.rb { background: #e8f0ff; color: #4c7cf3; } .r-ico.rc { background: #f0e7ff; color: #a06bf3; }
.r-info { flex: 1; } .r-info strong { display: block; font-size: 13.5px; } .r-info small { font-size: 11.5px; color: var(--muted); }
.r-role, .r-state { font-size: 11.5px; padding: 4px 10px; border-radius: 20px; font-weight: 600; }
.r-role.ra { background: #fff0f0; color: #e5484d; } .r-role.rb { background: #e8f0ff; color: #4c7cf3; } .r-role.rc { background: #f0e7ff; color: #a06bf3; }
.r-state.on { background: rgba(22,185,129,.12); color: var(--ok); } .r-state.off { background: var(--bg-soft); color: var(--muted); }
.switch { width: 44px; height: 25px; border-radius: 20px; border: none; background: #cfd4dd; position: relative; transition: .2s; flex-shrink: 0; }
.switch i { position: absolute; top: 3px; left: 3px; width: 19px; height: 19px; border-radius: 50%; background: #fff; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.switch.on { background: var(--ok); } .switch.on i { left: 22px; }
.empty { text-align: center; padding: 40px; color: var(--muted); }
@media (max-width: 1100px) { .stats-grid, .top-cards { grid-template-columns: repeat(2, 1fr); } }
</style>
