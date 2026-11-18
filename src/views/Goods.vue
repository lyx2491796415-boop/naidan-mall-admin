<template>
  <div>
    <PageHeader title="商品管理" subtitle="上架商品、维护库存与价格，低库存自动提醒">
      <button class="btn-primary" @click="openAdd"><Icon name="plus" :size="16" /> 新增商品</button>
    </PageHeader>

    <div class="stats-grid">
      <StatCard label="商品总数" :value="store.goods.length" icon="box" color="#eda62a" tint="#fff3d9" />
      <StatCard label="库存总量" :value="totalStock" icon="chart" color="#4c7cf3" tint="#e8f0ff" />
      <StatCard label="库存货值" :value="money(totalValue)" icon="wallet" color="#16b981" tint="#dcf7ec" />
      <StatCard label="低库存预警" :value="lowStock" icon="bell" color="#e5484d" tint="#ffe9e9" />
    </div>

    <div class="panel">
      <div class="toolbar">
        <div class="search"><Icon name="search" :size="17" /><input v-model="keyword" placeholder="搜索商品名称…" /></div>
        <div class="cats">
          <button v-for="c in ['全部', '数码', '服饰', '食品', '家居']" :key="c" :class="{ active: category === c }" @click="category = c">{{ c }}</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>商品</th><th>分类</th><th>价格</th><th>库存</th><th>已售</th><th>标签</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="g in filtered" :key="g.id">
              <td><div class="good-cell"><span class="thumb" :style="{ background: colorFor(g.category) }"><Icon :name="iconFor(g.category)" :size="20" /></span><div><b>{{ g.name }}</b><small>#{{ g.id }}</small></div></div></td>
              <td><span class="cat" :style="{ color: colorFor(g.category) }">{{ g.category }}</span></td>
              <td class="money">{{ money(g.price) }}</td>
              <td><span :class="['stock', g.stock < 20 ? 'low' : '']">{{ g.stock }}<em v-if="g.stock < 20">偏低</em></span></td>
              <td class="muted">{{ g.sold }}</td>
              <td><span v-if="g.tag" class="tag" :class="tagCls(g.tag)">{{ g.tag }}</span><span v-else class="muted">—</span></td>
              <td><div class="ops"><button class="op" @click="edit(g)" title="编辑"><Icon name="edit" :size="16" /></button><button class="op danger" @click="remove(g)" title="删除"><Icon name="trash" :size="16" /></button></div></td>
            </tr>
          </tbody>
        </table>
        <div v-if="!filtered.length" class="empty"><Mascot mood="dizzy" :size="80" /><p>没有找到相关商品</p></div>
      </div>
    </div>

    <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-head"><h3>{{ editing ? '编辑商品' : '新增商品' }}</h3><button @click="showModal = false">×</button></div>
        <label>商品名称</label><input v-model="draft.name" placeholder="输入商品名称" />
        <div class="two"><div><label>分类</label><select v-model="draft.category"><option v-for="c in ['数码','服饰','食品','家居']" :key="c">{{ c }}</option></select></div><div><label>标签</label><select v-model="draft.tag"><option value="">无</option><option>热卖</option><option>新品</option><option>补货</option></select></div></div>
        <div class="two"><div><label>价格</label><input v-model.number="draft.price" type="number" /></div><div><label>库存</label><input v-model.number="draft.stock" type="number" /></div></div>
        <div class="modal-btns"><button class="btn-ghost" @click="showModal = false">取消</button><button class="btn-primary" @click="save">保存</button></div>
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

const keyword = ref(''); const category = ref('全部')
const showModal = ref(false); const editing = ref(false)
const draft = ref({ name: '', category: '数码', price: 0, stock: 0, tag: '' })

const totalStock = computed(() => store.goods.reduce((s, g) => s + g.stock, 0))
const totalValue = computed(() => store.goods.reduce((s, g) => s + g.stock * g.price, 0))
const lowStock = computed(() => store.goods.filter(g => g.stock < 20).length)
const filtered = computed(() => store.goods.filter(g => g.name.includes(keyword.value) && (category.value === '全部' || g.category === category.value)))

const colorFor = c => ({ '数码': '#4c7cf3', '服饰': '#e5484d', '食品': '#16b981', '家居': '#a06bf3' }[c] || '#eda62a')
const iconFor = c => ({ '数码': 'grid', '服饰': 'box', '食品': 'cart', '家居': 'mood' }[c] || 'box')
const tagCls = t => ({ '热卖': 't-hot', '新品': 't-new', '补货': 't-low' }[t])
const openAdd = () => { editing.value = false; draft.value = { name: '', category: '数码', price: 0, stock: 0, tag: '' }; showModal.value = true }
const edit = g => { editing.value = true; draft.value = { ...g }; showModal.value = true }
const save = () => {
  if (!draft.value.name.trim()) return alert('请填写商品名称')
  if (editing.value) Object.assign(store.goods.find(g => g.id === draft.value.id), draft.value)
  else store.goods.unshift({ id: nextId(store.goods), sold: 0, ...draft.value })
  showModal.value = false
}
const remove = g => { if (confirm(`确定删除「${g.name}」吗？`)) store.goods = store.goods.filter(x => x.id !== g.id) }
</script>

<style scoped>
.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-sm); overflow: hidden; }
.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 14px 20px; border-bottom: 1px solid var(--line); flex-wrap: wrap; }
.search { display: flex; align-items: center; gap: 8px; background: var(--bg-soft); border-radius: 10px; padding: 0 12px; color: var(--muted); }
.search input { border: none; background: transparent; outline: none; padding: 9px 0; width: 210px; font-size: 13px; }
.cats { display: flex; gap: 6px; }
.cats button { border: 1px solid var(--line); background: var(--card); padding: 7px 13px; border-radius: 8px; font-size: 12.5px; color: var(--muted); }
.cats button.active { background: var(--gold-4); border-color: var(--gold-4); color: #fff; font-weight: 600; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 760px; }
th { text-align: left; font-size: 12px; color: var(--muted); font-weight: 500; padding: 14px 20px; background: var(--bg-soft); }
td { padding: 12px 20px; font-size: 13px; border-top: 1px solid var(--line); }
tbody tr:hover { background: var(--bg-soft); }
.good-cell { display: flex; align-items: center; gap: 11px; }
.thumb { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; color: #fff; flex-shrink: 0; }
.good-cell b { display: block; font-size: 13px; } .good-cell small { color: var(--muted); font-size: 11px; }
.cat { font-weight: 600; font-size: 12.5px; } .money { font-weight: 600; } .muted { color: var(--muted); }
.stock { font-weight: 600; } .stock.low { color: var(--danger); } .stock em { font-style: normal; font-size: 10px; margin-left: 5px; background: #ffe9e9; padding: 2px 6px; border-radius: 5px; }
.tag { font-size: 11px; padding: 3px 9px; border-radius: 20px; font-weight: 600; }
.t-hot { background: #fff0f0; color: #e5484d; } .t-new { background: #e8f0ff; color: #4c7cf3; } .t-low { background: #fff3d9; color: #c8800c; }
.ops { display: flex; gap: 6px; } .op { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line); background: var(--card); display: grid; place-items: center; color: var(--muted); }
.op:hover { color: var(--gold-5); border-color: var(--gold-3); } .op.danger:hover { color: var(--danger); border-color: var(--danger); }
.empty { text-align: center; padding: 40px; color: var(--muted); } .empty :deep(.mascot) { margin: 0 auto 10px; }
.modal-mask { position: fixed; inset: 0; background: rgba(15,18,25,.5); display: grid; place-items: center; z-index: 100; backdrop-filter: blur(3px); }
.modal { background: var(--card); border-radius: var(--r-lg); padding: 26px; width: 420px; max-width: 92vw; }
.modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.modal-head h3 { font-size: 18px; } .modal-head button { border: none; background: transparent; font-size: 24px; color: var(--muted); }
.modal label { display: block; font-size: 12.5px; font-weight: 600; margin: 12px 0 6px; }
.modal input, .modal select { width: 100%; border: 1px solid var(--line); background: var(--bg); border-radius: 9px; padding: 10px 12px; outline: none; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.btn-ghost { padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: var(--card); border: 1px solid var(--line); }
.modal-btns { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
@media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
