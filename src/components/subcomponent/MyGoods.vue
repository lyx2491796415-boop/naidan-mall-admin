<template>
  <div class="page-wrap">
    <div class="page-header">
      <div>
        <h2>🛍️ 商品管理</h2>
        <p>第 3 章 · 商品新增、删除与条件筛选（名称 + 分类两个条件同时满足才显示）</p>
      </div>
      <img class="header-mascot" src="../../assets/naidan.png" alt="奶娃" />
    </div>

    <!-- 数据概览 -->
    <div class="stat-row">
      <div class="stat-card"><div class="num">{{ goodsList.length }}</div><div class="label">商品总数</div></div>
      <div class="stat-card"><div class="num">{{ totalStock }}</div><div class="label">总库存（件）</div></div>
      <div class="stat-card"><div class="num">¥{{ totalValue }}</div><div class="label">库存总价值</div></div>
      <div class="stat-card"><div class="num">{{ filteredGoods.length }}</div><div class="label">当前筛选结果</div></div>
    </div>

    <!-- 新增商品表单：reactive 保存表单 -->
    <div class="add-form-card">
      <div class="card-title">➕ 新增商品</div>
      <div class="form-row">
        <input v-model="newGoods.name" placeholder="商品名称（必填）" />
        <select v-model="newGoods.category">
          <option value="数码">数码</option>
          <option value="服装">服装</option>
          <option value="食品">食品</option>
        </select>
        <input v-model.number="newGoods.price" type="number" placeholder="商品价格" />
        <input v-model.number="newGoods.stock" type="number" placeholder="库存数量" />
        <button class="btn-add" @click="addGoods">新增商品</button>
      </div>
    </div>

    <!-- 筛选区 -->
    <div class="filter-card">
      <span>🔎 筛选：</span>
      <input v-model="keyword" placeholder="输入商品名称搜索" />
      <select v-model="filterCategory">
        <option value="">全部分类</option>
        <option value="数码">数码</option>
        <option value="服装">服装</option>
        <option value="食品">食品</option>
      </select>
      <span class="count-tip">两个条件都满足的商品才会留在表格里</span>
    </div>

    <div class="card-box">
      <table>
        <thead>
          <tr><th>商品编号</th><th>商品名称</th><th>分类</th><th>价格</th><th>库存</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredGoods" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="bold">{{ item.name }}</td>
            <td><span class="cate-tag" :class="cateClass(item.category)">{{ item.category }}</span></td>
            <td class="price">¥{{ item.price }}</td>
            <td>{{ item.stock }} <span v-if="item.stock < 50" class="low-stock">库存偏低</span></td>
            <td><button class="btn-del" @click="removeGoods(item.id)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <!-- 用 v-if 显示空提示 -->
      <div v-if="filteredGoods.length === 0" class="empty-tip">
        <img src="../../assets/naidan.png" alt="" />
        <p>暂无符合条件的商品</p>
        <span>换个关键字或分类试试，或在上面新增一个商品</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
// 用 ref 保存商品列表
const goodsList = ref([
  { id: 1001, name: '无线蓝牙耳机', category: '数码', price: 199, stock: 66 },
  { id: 1002, name: '纯棉短袖T恤', category: '服装', price: 89, stock: 120 },
  { id: 1003, name: '坚果大礼包', category: '食品', price: 138, stock: 200 },
  { id: 1004, name: '机械键盘', category: '数码', price: 349, stock: 45 }
])
// 用 reactive 保存新增表单
const newGoods = reactive({ name: '', category: '数码', price: 0, stock: 0 })
const keyword = ref('')
const filterCategory = ref('')

// computed 同时按名称关键字和分类筛选：两个条件都满足（&&）才保留
const filteredGoods = computed(() => {
  return goodsList.value.filter(g => {
    const nameOk = g.name.includes(keyword.value)
    const cateOk = filterCategory.value === '' || g.category === filterCategory.value
    return nameOk && cateOk
  })
})
const totalStock = computed(() => goodsList.value.reduce((s, g) => s + g.stock, 0))
const totalValue = computed(() => goodsList.value.reduce((s, g) => s + g.price * g.stock, 0))
const cateClass = (c) => c === '数码' ? 'c-digital' : c === '服装' ? 'c-cloth' : 'c-food'

// 校验名称后自增编号并 push，再清空表单
const addGoods = () => {
  if (!newGoods.name.trim()) { alert('商品名称不能为空！'); return }
  const maxId = goodsList.value.length ? Math.max(...goodsList.value.map(i => i.id)) : 1000
  goodsList.value.push({
    id: maxId + 1,
    name: newGoods.name,
    category: newGoods.category,
    price: newGoods.price,
    stock: newGoods.stock
  })
  newGoods.name = ''
  newGoods.price = 0
  newGoods.stock = 0
}
// 按编号 filter 删除
const removeGoods = (id) => {
  goodsList.value = goodsList.value.filter(g => g.id !== id)
}
</script>

<style lang="less" scoped>
.page-wrap { padding: 24px; min-height: 100%; }
.page-header {
  margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;
  h2 { margin: 0; color: #303133; font-size: 24px; }
  p { margin: 6px 0 0; color: #909399; font-size: 14px; }
  .header-mascot { width: 58px; height: 58px; border-radius: 50%; object-fit: cover; border: 3px solid #ffe27a; background:#fff; box-shadow: 0 8px 20px rgba(255,159,26,.3); }
}
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 16px; }
.stat-card {
  background: #fff; border-radius: 14px; padding: 16px 18px;
  box-shadow: 0 2px 14px rgba(0,0,0,.06); border-top: 4px solid #ffb52e;
  .num { font-size: 25px; font-weight: 800; color: #303133; }
  .label { color: #909399; font-size: 13px; margin-top: 4px; }
}
.add-form-card, .filter-card {
  background: #fff; padding: 16px 18px; border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05); margin-bottom: 16px;
}
.card-title { font-weight: 800; margin-bottom: 12px; color: #303133; }
.form-row, .filter-card { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.add-form-card input, .add-form-card select, .filter-card input, .filter-card select {
  padding: 9px 12px; border: 1px solid #dcdfe6; border-radius: 8px; outline: none;
  &:focus { border-color: #ffb52e; box-shadow: 0 0 0 3px rgba(255,181,46,.14); }
}
.filter-card .count-tip { color: #909399; font-size: 13px; }
.btn-add {
  background: linear-gradient(90deg,#ffb52e,#ff9f1a); color: #fff; border: none;
  padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 700;
  box-shadow: 0 6px 16px rgba(255,159,26,.3);
  &:hover { filter: brightness(1.05); }
}
.card-box {
  background: #fff; border-radius: 14px; box-shadow: 0 2px 14px rgba(0,0,0,.07); overflow: hidden;
  table {
    width: 100%; border-collapse: collapse;
    th { background: #fff8e1; padding: 14px; text-align: left; color: #7a5c00; font-size: 14px; }
    td { padding: 14px; border-top: 1px solid #f3ecd9; }
    tbody tr:hover { background: #fffdf4; }
  }
}
.bold { font-weight: 600; } .price { color: #e8930c; font-weight: 800; }
.cate-tag { padding: 4px 11px; border-radius: 20px; font-size: 13px; font-weight: 600;
  &.c-digital { background:#e1f3ff; color:#409eff; } &.c-cloth { background:#fdeef7; color:#d63384; } &.c-food { background:#e7f9ef; color:#009688; } }
.low-stock { color:#f56c6c; font-size:12px; background:#fef0f0; padding:2px 7px; border-radius:10px; margin-left:5px; }
.btn-del { background: #fef0f0; color: #f56c6c; border: none; padding: 6px 13px; border-radius: 6px; cursor: pointer; font-weight: 600; &:hover { background:#fde2e2; } }
.empty-tip {
  text-align: center; padding: 34px 0 38px; color: #909399;
  img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; opacity: .9; }
  p { font-size: 16px; font-weight: 700; color:#606266; margin: 10px 0 4px; }
  span { font-size: 13px; }
}
@media (max-width: 760px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
</style>
