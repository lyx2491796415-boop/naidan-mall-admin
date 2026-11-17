<template>
  <div class="page-wrap">
    <div class="page-header">
      <div>
        <h2>📦 订单管理</h2>
        <p>第 4 章 · 订单状态流转处理：待付款 → 已付款 → 已发货，一步步点着走</p>
      </div>
      <img class="header-mascot" src="../../assets/naidan.png" alt="奶娃" />
    </div>

    <!-- 数据概览 -->
    <div class="stat-row">
      <div class="stat-card"><div class="num">{{ ordersList.length }}</div><div class="label">订单总数</div></div>
      <div class="stat-card"><div class="num">¥{{ totalAmount }}</div><div class="label">订单总金额</div></div>
      <div class="stat-card orange"><div class="num">{{ countByStatus('待付款') }}</div><div class="label">待付款</div></div>
      <div class="stat-card green"><div class="num">{{ countByStatus('已发货') }}</div><div class="label">已发货（已完成流转）</div></div>
    </div>

    <!-- 状态按钮：用 v-for 遍历 tabList 生成，用 class 绑定当前项高亮 -->
    <div class="tabs-wrap">
      <button v-for="tab in tabList" :key="tab.val"
        class="tab-btn"
        :class="{ active: currentStatus === tab.val }"
        @click="currentStatus = tab.val">
        {{ tab.label }}
        <span class="tab-count">{{ tab.val === '' ? ordersList.length : countByStatus(tab.val) }}</span>
      </button>
    </div>

    <!-- 流转示意：一眼看明白订单怎么走 -->
    <div class="flow-tip">订单流转：<b>待付款</b> —确认付款→ <b>已付款</b> —发货→ <b>已发货</b>（完成）</div>

    <div class="card-box">
      <table>
        <thead>
          <tr><th>订单编号</th><th>下单用户</th><th>商品名称</th><th>订单金额</th><th>订单状态</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filterOrders" :key="item.id">
            <td class="bold">{{ item.id }}</td>
            <td>{{ item.customer }}</td>
            <td>{{ item.goodsName }}</td>
            <td class="price">¥{{ item.amount }}</td>
            <td><span class="tag" :class="getTagClass(item.status)">{{ item.status }}</span></td>
            <td>
              <!-- 按状态显示不同操作，点击后调用 changeStatus 流转到下一状态 -->
              <button v-if="item.status === '待付款'" class="btn-pay" @click="changeStatus(item, '已付款')">确认付款</button>
              <button v-if="item.status === '已付款'" class="btn-send" @click="changeStatus(item, '已发货')">发货</button>
              <span v-if="item.status === '已发货'" class="text-done">✅ 已流转完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterOrders.length === 0" class="empty-tip">
        <img src="../../assets/naidan.png" alt="" />
        <p>暂无该状态订单</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// 状态按钮列表
const tabList = [
  { label: '全部', val: '' },
  { label: '待付款', val: '待付款' },
  { label: '已付款', val: '已付款' },
  { label: '已发货', val: '已发货' }
]
// 用 ref 保存当前选中状态和订单列表
const currentStatus = ref('')
const ordersList = ref([
  { id: 'DD2026001', customer: '小明', goodsName: '蓝牙耳机', amount: 199, status: '待付款' },
  { id: 'DD2026002', customer: '小红', goodsName: '机械键盘', amount: 349, status: '已付款' },
  { id: 'DD2026003', customer: '小兰', goodsName: '纯棉T恤', amount: 89, status: '已发货' },
  { id: 'DD2026004', customer: '小芳', goodsName: '坚果礼盒', amount: 138, status: '待付款' }
])

const filterOrders = computed(() => {
  if (!currentStatus.value) return ordersList.value
  return ordersList.value.filter(o => o.status === currentStatus.value)
})
const totalAmount = computed(() => ordersList.value.reduce((s, o) => s + o.amount, 0))
const countByStatus = (s) => ordersList.value.filter(o => o.status === s).length

// 按状态返回不同颜色的标签类
const getTagClass = (s) => {
  if (s === '待付款') return 'wait'
  if (s === '已付款') return 'payed'
  if (s === '已发货') return 'send'
}
// 流转到下一状态
const changeStatus = (obj, next) => {
  obj.status = next
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
  &.orange { border-top-color: #e6a23c; } &.green { border-top-color: #00b578; }
  .num { font-size: 25px; font-weight: 800; color: #303133; }
  .label { color: #909399; font-size: 13px; margin-top: 4px; }
}
.tabs-wrap { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;
  .tab-btn {
    padding: 9px 18px; border-radius: 22px; border: 1.5px solid #e6e0cd;
    background: #fff; cursor: pointer; font-size: 14px; font-weight: 600; color:#606266;
    display: flex; align-items: center; gap: 7px;
    .tab-count { background:#f4f0dd; color:#8a6d00; font-size:12px; padding: 1px 8px; border-radius: 12px; }
    &.active { background: linear-gradient(90deg,#ffb52e,#ff9f1a); color: #fff; border-color: transparent; box-shadow: 0 6px 16px rgba(255,159,26,.32);
      .tab-count { background: rgba(255,255,255,.3); color:#fff; } }
  }
}
.flow-tip { font-size: 13.5px; color: #8a6d00; background: #fff8e1; border: 1px dashed #ecd28a; border-radius: 10px; padding: 10px 14px; margin-bottom: 16px; }
.card-box {
  background: #fff; border-radius: 14px; box-shadow: 0 2px 14px rgba(0,0,0,.07); overflow: hidden;
  table {
    width: 100%; border-collapse: collapse;
    th { background: #fff8e1; padding: 14px; text-align: left; color: #7a5c00; font-size: 14px; }
    td { padding: 14px; border-top: 1px solid #f3ecd9; }
    tbody tr:hover { background: #fffdf4; }
  }
}
.bold { font-weight: 700; } .price { color:#e8930c; font-weight: 800; }
.tag { padding: 4px 11px; border-radius: 20px; font-size: 13px; font-weight: 700;
  &.wait { background: #fff7e6; color: #e6a23c; }
  &.payed { background: #e1f3ff; color: #409eff; }
  &.send { background: #e7f9ef; color: #009688; } }
.btn-pay { background: #fff1cf; color: #b97a00; border: none; padding: 7px 14px; border-radius: 7px; cursor: pointer; font-weight: 700; &:hover { background:#ffe9a8; } }
.btn-send { background: #e1f3ff; color: #409eff; border: none; padding: 7px 14px; border-radius: 7px; cursor: pointer; font-weight: 700; &:hover { background:#cfe9ff; } }
.text-done { color: #009688; font-size: 13px; font-weight: 600; }
.empty-tip { text-align: center; padding: 32px 0 36px; color: #909399;
  img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; } p { margin-top: 8px; font-weight: 600; } }
@media (max-width: 760px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
</style>
