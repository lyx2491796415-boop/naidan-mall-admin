<template>
  <div>
    <PageHeader title="经营概览" :subtitle="greeting">
      <button class="ghost-btn"><Icon name="clock" :size="16" /> 近 30 天</button>
      <button class="primary-btn" @click="$router.push('/home/orders')"><Icon name="arrow" :size="16" /> 处理订单</button>
    </PageHeader>

    <div class="stats-grid">
      <StatCard label="总营收" :value="money(revenue)" icon="wallet" color="#eda62a" tint="#fff3d9" trend="12.6" delay="0s" sub="较上月" />
      <StatCard label="订单总数" :value="orderCount" icon="cart" color="#4c7cf3" tint="#e8f0ff" trend="8.2" delay=".06s" sub="较上月" />
      <StatCard label="活跃用户" :value="activeUsers" icon="users" color="#16b981" tint="#dcf7ec" trend="5.4" delay=".12s" sub="较上月" />
      <StatCard label="商品SKU" :value="store.goods.length * 48" icon="box" color="#a06bf3" tint="#f0e7ff" trend="-2.1" delay=".18s" sub="较上月" />
    </div>

    <div class="charts">
      <div class="panel trend-panel">
        <div class="panel-head"><div><h3>营收趋势</h3><p>近 12 周成交额走势</p></div><span class="legend"><i></i> 本周</span></div>
        <div class="line-chart">
          <svg viewBox="0 0 600 200" preserveAspectRatio="none">
            <defs><linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eda62a" stop-opacity=".35"/><stop offset="100%" stop-color="#eda62a" stop-opacity="0"/></linearGradient></defs>
            <g stroke="var(--line)" stroke-width="1">
              <line x1="0" y1="40" x2="600" y2="40"/><line x1="0" y1="90" x2="600" y2="90"/><line x1="0" y1="140" x2="600" y2="140"/><line x1="0" y1="190" x2="600" y2="190"/>
            </g>
            <path :d="areaPath" fill="url(#areaG)" />
            <path :d="linePath" fill="none" stroke="#eda62a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#eda62a" stroke-width="2.5" />
          </svg>
          <div class="x-axis"><span v-for="m in months" :key="m">{{ m }}</span></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><div><h3>品类销售占比</h3><p>按销售额统计</p></div></div>
        <div class="donut-wrap">
          <svg viewBox="0 0 160 160" class="donut">
            <circle v-for="(seg, i) in donutSegs" :key="i" cx="80" cy="80" r="60" fill="none"
              :stroke="seg.color" stroke-width="18" :stroke-dasharray="`${seg.len} ${circ - seg.len}`"
              :stroke-dashoffset="-seg.offset" transform="rotate(-90 80 80)" />
          </svg>
          <div class="donut-center"><strong>{{ categories.length }}</strong><span>品类</span></div>
        </div>
        <ul class="cat-list">
          <li v-for="c in categories" :key="c.name"><i :style="{ background: c.color }"></i><span>{{ c.name }}</span><b>{{ c.value }}%</b></li>
        </ul>
      </div>
    </div>

    <div class="bottom">
      <div class="panel">
        <div class="panel-head"><div><h3>实时动态</h3><p>最近发生的事情</p></div><span class="live"><i></i> LIVE</span></div>
        <ul class="feed">
          <li v-for="(a, i) in store.activities" :key="i">
            <span class="feed-ico" :class="'f-' + a.type"><Icon :name="a.type === 'warn' ? 'bell' : a.type === 'user' ? 'users' : 'cart'" :size="16" /></span>
            <div><p>{{ a.text }}</p><small>{{ a.time }}</small></div>
          </li>
        </ul>
      </div>
      <div class="panel quick-panel">
        <div class="panel-head"><div><h3>快捷操作</h3><p>常用功能一步直达</p></div></div>
        <div class="quick-grid">
          <button v-for="q in quick" :key="q.label" @click="$router.push(q.path)">
            <span :style="{ background: q.tint, color: q.color }"><Icon :name="q.icon" :size="21" /></span>
            <b>{{ q.label }}</b><small>{{ q.desc }}</small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import Icon from '../components/Icon.vue'
import { store, money } from '../store'

const hour = new Date().getHours()
const greeting = computed(() => hour < 11 ? '早上好，奶娃。今天也要元气满满 ☀' : hour < 14 ? '中午好，奶娃。记得休息一下~' : '下午好，奶娃。来看看今天的成绩吧')

const revenue = computed(() => store.goods.reduce((s, g) => s + g.sold * g.price, 0))
const orderCount = computed(() => store.orders.length + 1246)
const activeUsers = computed(() => store.users.filter(u => u.status === 'active').length * 384)

const raw = [42, 58, 51, 74, 66, 88, 79, 96, 84, 108, 99, 126]
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const points = computed(() => {
  const max = Math.max(...raw) * 1.15
  return raw.map((v, i) => ({ x: 10 + i * (580 / (raw.length - 1)), y: 190 - (v / max) * 170 }))
})
const linePath = computed(() => points.value.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' '))
const areaPath = computed(() => linePath.value + ` L 590 190 L 10 190 Z`)

const categories = [
  { name: '数码', value: 42, color: '#eda62a' },
  { name: '家居', value: 28, color: '#4c7cf3' },
  { name: '服饰', value: 19, color: '#16b981' },
  { name: '食品', value: 11, color: '#a06bf3' }
]
const circ = 2 * Math.PI * 60
const donutSegs = computed(() => {
  let offset = 0
  return categories.map(c => {
    const len = (c.value / 100) * circ
    const seg = { ...c, len, offset }
    offset += len
    return seg
  })
})

const quick = [
  { label: '新增商品', desc: '上架一件好货', icon: 'plus', path: '/home/goods', color: '#eda62a', tint: '#fff3d9' },
  { label: '用户管理', desc: '查看会员资料', icon: 'users', path: '/home/users', color: '#4c7cf3', tint: '#e8f0ff' },
  { label: '订单处理', desc: '确认收款发货', icon: 'cart', path: '/home/orders', color: '#16b981', tint: '#dcf7ec' },
  { label: '表情馆', desc: '领取今日快乐', icon: 'mood', path: '/home/memes', color: '#a06bf3', tint: '#f0e7ff' }
]
</script>

<style scoped>
.ghost-btn, .primary-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; }
.ghost-btn { background: var(--card); border: 1px solid var(--line); color: var(--ink-2); }
.primary-btn { background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; box-shadow: 0 6px 16px rgba(232, 147, 28, .28); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.charts { display: grid; grid-template-columns: 1.7fr 1fr; gap: 18px; margin-bottom: 18px; }
.bottom { display: grid; grid-template-columns: 1.15fr 1fr; gap: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 22px 24px; box-shadow: var(--shadow-sm); }
.panel-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.panel-head h3 { font-size: 15.5px; font-weight: 700; }
.panel-head p { font-size: 12px; color: var(--muted); margin-top: 3px; }
.legend { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
.legend i { width: 9px; height: 9px; border-radius: 50%; background: var(--gold-4); }
.line-chart svg { width: 100%; height: 190px; overflow: visible; }
.x-axis { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--muted); margin-top: 6px; }
.donut-wrap { position: relative; display: grid; place-items: center; margin: 4px 0 12px; }
.donut { width: 150px; height: 150px; }
.donut circle { transition: stroke-dasharray .6s; }
.donut-center { position: absolute; text-align: center; }
.donut-center strong { display: block; font-size: 28px; }
.donut-center span { font-size: 12px; color: var(--muted); }
.cat-list { display: flex; flex-direction: column; gap: 9px; }
.cat-list li { display: flex; align-items: center; gap: 9px; font-size: 12.5px; }
.cat-list i { width: 9px; height: 9px; border-radius: 3px; }
.cat-list span { color: var(--muted); }
.cat-list b { margin-left: auto; font-weight: 600; }
.live { font-size: 10px; font-weight: 700; color: var(--ok); background: rgba(22,185,129,.12); padding: 3px 8px; border-radius: 6px; display: flex; align-items: center; gap: 5px; }
.live i { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); animation: pulse 1.6s infinite; }
@keyframes pulse { 50% { opacity: .3; } }
.feed { display: flex; flex-direction: column; }
.feed li { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--line); }
.feed li:last-child { border: none; }
.feed-ico { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; flex-shrink: 0; }
.f-order { background: #e8f0ff; color: #4c7cf3; } .f-warn { background: #fff1d9; color: #e8931c; } .f-user { background: #dcf7ec; color: #16b981; }
.feed p { font-size: 13px; line-height: 1.4; }
.feed small { font-size: 11px; color: var(--muted); }
.quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
.quick-grid button { text-align: left; border: 1px solid var(--line); background: var(--bg); border-radius: 13px; padding: 14px; transition: .2s; }
.quick-grid button:hover { border-color: var(--gold-3); transform: translateY(-2px); }
.quick-grid button > span { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; margin-bottom: 9px; }
.quick-grid b { display: block; font-size: 13px; }
.quick-grid small { font-size: 11px; color: var(--muted); }
@media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .charts, .bottom { grid-template-columns: 1fr; } }
</style>
