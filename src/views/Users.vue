<template>
  <div>
    <PageHeader title="用户管理" subtitle="管理会员资料，追踪消费与客户等级">
      <button class="btn-ghost"><Icon name="filter" :size="16" /> 筛选</button>
      <button class="btn-primary" @click="openAdd"><Icon name="plus" :size="16" /> 新增用户</button>
    </PageHeader>

    <div class="stats-grid">
      <StatCard label="用户总数" :value="store.users.length" icon="users" color="#eda62a" tint="#fff3d9" trend="9.1" />
      <StatCard label="活跃用户" :value="activeCount" icon="check" color="#16b981" tint="#dcf7ec" trend="4.3" />
      <StatCard label="钻石会员" :value="diamondCount" icon="chart" color="#a06bf3" tint="#f0e7ff" trend="2.6" />
      <StatCard label="累计消费" :value="money(totalSpend)" icon="wallet" color="#4c7cf3" tint="#e8f0ff" trend="14.2" />
    </div>

    <div class="panel">
      <div class="toolbar">
        <div class="search"><Icon name="search" :size="17" /><input v-model="keyword" placeholder="搜索姓名、城市…" /></div>
        <div class="filters">
          <select v-model="levelFilter"><option value="">全部等级</option><option v-for="l in levels" :key="l">{{ l }}</option></select>
          <select v-model="statusFilter"><option value="">全部状态</option><option value="active">正常</option><option value="disabled">已停用</option></select>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>用户</th><th>联系方式</th><th>城市</th><th>会员等级</th><th>累计消费</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="u in paged" :key="u.id">
              <td><div class="user-cell"><Mascot :mood="moodFor(u.id)" :size="40" /><div><b>{{ u.name }}</b><small>#{{ String(u.id).padStart(4, '0') }}</small></div></div></td>
              <td class="muted">{{ u.phone }}</td>
              <td>{{ u.city }}</td>
              <td><span class="level" :class="levelCls(u.level)">{{ u.level }}</span></td>
              <td class="money">{{ money(u.spend) }}</td>
              <td><span class="status" :class="u.status"><i></i>{{ u.status === 'active' ? '正常' : '停用' }}</span></td>
              <td><div class="ops"><router-link :to="'/home/users/' + u.id" class="op" title="详情"><Icon name="arrow" :size="16" /></router-link><button class="op" @click="toggleStatus(u)" title="切换状态"><Icon name="check" :size="16" /></button><button class="op danger" @click="remove(u)" title="删除"><Icon name="trash" :size="16" /></button></div></td>
            </tr>
          </tbody>
        </table>
        <div v-if="!paged.length" class="empty"><Mascot mood="sleepy" :size="80" /><p>没有找到匹配的用户</p></div>
      </div>

      <div class="pager">
        <span>共 {{ filtered.length }} 条 · 第 {{ page }}/{{ totalPages }} 页</span>
        <div><button :disabled="page === 1" @click="page--">上一页</button><button :disabled="page === totalPages" @click="page++">下一页</button></div>
      </div>
    </div>

    <div v-if="showAdd" class="modal-mask" @click.self="showAdd = false">
      <div class="modal">
        <div class="modal-head"><h3>新增用户</h3><button @click="showAdd = false">×</button></div>
        <label>姓名</label><input v-model="draft.name" placeholder="输入姓名" />
        <label>城市</label><input v-model="draft.city" placeholder="输入城市" />
        <label>会员等级</label><select v-model="draft.level"><option v-for="l in levels" :key="l">{{ l }}</option></select>
        <div class="modal-btns"><button class="btn-ghost" @click="showAdd = false">取消</button><button class="btn-primary" @click="addUser">确认添加</button></div>
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
import { store, nextId, money } from '../store'

const levels = ['钻石会员', '黄金会员', '白银会员', '普通会员']
const keyword = ref(''); const levelFilter = ref(''); const statusFilter = ref('')
const page = ref(1); const pageSize = 5; const showAdd = ref(false)
const draft = ref({ name: '', city: '', level: '普通会员' })

const activeCount = computed(() => store.users.filter(u => u.status === 'active').length)
const diamondCount = computed(() => store.users.filter(u => u.level === '钻石会员').length)
const totalSpend = computed(() => store.users.reduce((s, u) => s + u.spend, 0))

const filtered = computed(() => store.users.filter(u => {
  const kw = u.name.includes(keyword.value) || u.city.includes(keyword.value)
  return kw && (!levelFilter.value || u.level === levelFilter.value) && (!statusFilter.value || u.status === statusFilter.value)
}))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

const moodFor = id => ['happy', 'cool', 'love', 'wink', 'smug', 'shocked'][id % 6]
const levelCls = l => ({ '钻石会员': 'lv-diamond', '黄金会员': 'lv-gold', '白银会员': 'lv-silver', '普通会员': 'lv-normal' }[l])
const toggleStatus = u => { u.status = u.status === 'active' ? 'disabled' : 'active' }
const remove = u => { if (confirm(`确定删除用户「${u.name}」吗？`)) store.users = store.users.filter(x => x.id !== u.id) }
const openAdd = () => { draft.value = { name: '', city: '', level: '普通会员' }; showAdd.value = true }
const addUser = () => {
  if (!draft.value.name.trim()) return alert('请填写姓名')
  store.users.unshift({ id: nextId(store.users), name: draft.value.name, level: draft.value.level, phone: '138****0000', city: draft.value.city || '未知', joined: new Date().toISOString().slice(0, 10), status: 'active', spend: 0 })
  showAdd.value = false; page.value = 1
}
</script>

<style scoped>
.btn-ghost, .btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; }
.btn-ghost { background: var(--card); border: 1px solid var(--line); color: var(--ink-2); }
.btn-primary { background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-sm); overflow: hidden; }
.toolbar { display: flex; justify-content: space-between; gap: 14px; padding: 16px 20px; border-bottom: 1px solid var(--line); flex-wrap: wrap; }
.search { display: flex; align-items: center; gap: 8px; background: var(--bg-soft); border-radius: 10px; padding: 0 12px; color: var(--muted); }
.search input { border: none; background: transparent; outline: none; padding: 9px 0; width: 220px; font-size: 13px; }
.filters { display: flex; gap: 10px; }
select { border: 1px solid var(--line); background: var(--card); border-radius: 9px; padding: 9px 12px; font-size: 13px; outline: none; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 760px; }
th { text-align: left; font-size: 12px; color: var(--muted); font-weight: 500; padding: 14px 20px; background: var(--bg-soft); }
td { padding: 13px 20px; font-size: 13px; border-top: 1px solid var(--line); }
tbody tr { transition: background .15s; } tbody tr:hover { background: var(--bg-soft); }
.muted { color: var(--muted); } .money { font-weight: 600; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-cell :deep(.mascot) { border-radius: 50%; background: var(--gold-1); }
.user-cell b { display: block; font-size: 13px; }
.user-cell small { color: var(--muted); font-size: 11px; }
.level { padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.lv-diamond { background: #eef0ff; color: #6c63d8; } .lv-gold { background: #fff3d9; color: #c8800c; } .lv-silver { background: #eef1f4; color: #7c8796; } .lv-normal { background: #f3f4f6; color: #98a0ad; }
.status { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; }
.status i { width: 7px; height: 7px; border-radius: 50%; }
.status.active { color: var(--ok); } .status.active i { background: var(--ok); } .status.disabled { color: var(--muted); } .status.disabled i { background: var(--muted); }
.ops { display: flex; gap: 6px; }
.op { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line); background: var(--card); display: grid; place-items: center; color: var(--muted); transition: .15s; }
.op:hover { color: var(--gold-5); border-color: var(--gold-3); } .op.danger:hover { color: var(--danger); border-color: var(--danger); }
.empty { text-align: center; padding: 40px; color: var(--muted); } .empty :deep(.mascot) { margin: 0 auto 10px; }
.pager { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); }
.pager button { border: 1px solid var(--line); background: var(--card); padding: 6px 12px; border-radius: 8px; margin-left: 6px; }
.pager button:disabled { opacity: .4; }
.modal-mask { position: fixed; inset: 0; background: rgba(15,18,25,.5); display: grid; place-items: center; z-index: 100; backdrop-filter: blur(3px); }
.modal { background: var(--card); border-radius: var(--r-lg); padding: 26px; width: 380px; max-width: 92vw; }
.modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.modal-head h3 { font-size: 18px; } .modal-head button { border: none; background: transparent; font-size: 24px; color: var(--muted); }
.modal label { display: block; font-size: 12.5px; font-weight: 600; margin: 14px 0 6px; }
.modal input, .modal select { width: 100%; border: 1px solid var(--line); background: var(--bg); border-radius: 9px; padding: 10px 12px; outline: none; }
.modal-btns { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
@media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
