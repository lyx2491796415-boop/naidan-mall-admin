<template>
  <div>
    <PageHeader title="订单管理" subtitle="跟进每一笔订单，从付款到发货全线掌控">
      <button class="btn-ghost"><Icon name="filter" :size="16" /> 更多筛选</button>
    </PageHeader>

    <div class="stats-grid">
      <StatCard label="订单总额" :value="money(totalAmount)" icon="wallet" color="#eda62a" tint="#fff3d9" trend="12.6" />
      <StatCard label="待付款" :value="count('pending')" icon="clock" color="#e5484d" tint="#ffe9e9" />
      <StatCard label="待发货" :value="count('paid')" icon="box" color="#4c7cf3" tint="#e8f0ff" />
      <StatCard label="已完成" :value="count('done') + count('shipped')" icon="check" color="#16b981" tint="#dcf7ec" />
    </div>

    <div class="panel">
      <div class="tabs">
        <button v-for="t in tabs" :key="t.val" :class="{ active: current === t.val }" @click="current = t.val">
          {{ t.label }} <em>{{ t.val ? count(t.val) : store.orders.length }}</em>
        </button>
      </div>
      <div class="flow"><span>订单流转：</span><b>待付款</b><i>→</i><b>已付款</b><i>→</i><b>已发货</b><i>→</i><b>已完成</b></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>订单编号</th><th>客户</th><th>商品</th><th>金额</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="o in filtered" :key="o.id">
              <td class="oid">{{ o.id }}</td>
              <td><div class="customer"><Mascot :mood="moodFor(o.id)" :size="30" />{{ o.customer }}</div></td>
              <td>{{ o.goods }}</td>
              <td class="money">{{ money(o.amount) }}</td>
              <td><span class="status" :class="meta(o.status).cls"><i></i>{{ meta(o.status).label }}</span></td>
              <td><button v-if="o.status !== 'done'" class="act" @click="advance(o)">{{ nextLabel(o.status) }} <Icon name="arrow" :size="14" /></button><span v-else class="finished"><Icon name="check" :size="14" /> 已完成</span></td>
            </tr>
          </tbody>
        </table>
        <div v-if="!filtered.length" class="empty"><Mascot mood="sleepy" :size="80" /><p>该状态下暂无订单</p></div>
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
import { store, money, statusMeta } from '../store'

const tabs = [
  { label: '全部订单', val: '' }, { label: '待付款', val: 'pending' },
  { label: '已付款', val: 'paid' }, { label: '已发货', val: 'shipped' }, { label: '已完成', val: 'done' }
]
const current = ref('')
const filtered = computed(() => current.value ? store.orders.filter(o => o.status === current.value) : store.orders)
const totalAmount = computed(() => store.orders.reduce((s, o) => s + o.amount, 0))
const count = s => store.orders.filter(o => o.status === s).length
const meta = s => statusMeta[s]
const order = ['pending', 'paid', 'shipped', 'done']
const nextLabel = s => ({ pending: '确认收款', paid: '发货', shipped: '完成' }[s])
const advance = o => { const i = order.indexOf(o.status); if (i < order.length - 1) o.status = order[i + 1] }
const moodFor = id => ['happy', 'cool', 'love', 'smug', 'wink'][Number(id.slice(-1)) % 5]
</script>

<style scoped>
.btn-ghost { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: var(--card); border: 1px solid var(--line); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-sm); overflow: hidden; }
.tabs { display: flex; gap: 4px; padding: 14px 20px; border-bottom: 1px solid var(--line); overflow-x: auto; }
.tabs button { border: none; background: transparent; padding: 9px 15px; border-radius: 9px; font-size: 13px; color: var(--muted); white-space: nowrap; display: flex; align-items: center; gap: 7px; }
.tabs button em { font-style: normal; font-size: 11px; background: var(--bg-soft); padding: 1px 7px; border-radius: 10px; }
.tabs button.active { background: var(--gold-4); color: #fff; font-weight: 600; }
.tabs button.active em { background: rgba(255,255,255,.25); }
.flow { font-size: 12px; color: var(--muted); padding: 12px 20px; background: var(--bg-soft); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
.flow b { color: var(--ink-2); font-weight: 600; } .flow i { color: var(--gold-4); font-style: normal; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 700px; }
th { text-align: left; font-size: 12px; color: var(--muted); font-weight: 500; padding: 14px 20px; background: var(--bg-soft); }
td { padding: 13px 20px; font-size: 13px; border-top: 1px solid var(--line); }
tbody tr:hover { background: var(--bg-soft); }
.oid { font-family: ui-monospace, monospace; color: var(--muted); font-size: 12px; }
.customer { display: flex; align-items: center; gap: 8px; }
.customer :deep(.mascot) { border-radius: 50%; background: var(--gold-1); }
.money { font-weight: 600; }
.status { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 5px 11px; border-radius: 20px; font-weight: 600; }
.status i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.s-pending { background: #fff0f0; color: #e5484d; } .s-paid { background: #e8f0ff; color: #4c7cf3; } .s-shipped { background: #fff3d9; color: #c8800c; } .s-done { background: #dcf7ec; color: #16b981; }
.act { display: inline-flex; align-items: center; gap: 5px; border: 1px solid var(--gold-3); background: var(--gold-1); color: var(--gold-5); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; }
.act:hover { background: var(--gold-4); color: #fff; }
.finished { display: inline-flex; align-items: center; gap: 5px; color: var(--ok); font-size: 12px; }
.empty { text-align: center; padding: 40px; color: var(--muted); } .empty :deep(.mascot) { margin: 0 auto 10px; }
</style>
