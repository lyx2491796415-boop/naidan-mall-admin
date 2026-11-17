<template>
  <div class="page-wrap">
    <div class="page-header">
      <div>
        <h2>🔐 权限管理</h2>
        <p>第 2 章 · 按角色分配系统操作权限，勾选复选框即可启用 / 关闭某项权限</p>
      </div>
      <img class="header-mascot" src="../../assets/naidan.png" alt="奶娃" />
    </div>

    <!-- 数据概览 -->
    <div class="stat-row">
      <div class="stat-card"><div class="num">{{ rightsList.length }}</div><div class="label">权限总数</div></div>
      <div class="stat-card green"><div class="num">{{ enabledCount }}</div><div class="label">已启用</div></div>
      <div class="stat-card gray"><div class="num">{{ rightsList.length - enabledCount }}</div><div class="label">未启用</div></div>
      <div class="stat-card">
        <div class="num">{{ enabledRate }}%</div><div class="label">启用率</div>
        <div class="rate-bar"><i :style="{ width: enabledRate + '%' }"></i></div>
      </div>
    </div>

    <div class="filter-card">
      <span>选择角色：</span>
      <select v-model="currentRole">
        <option value="全部">全部</option>
        <option value="管理员">管理员</option>
        <option value="编辑">编辑</option>
        <option value="访客">访客</option>
      </select>
      <span class="count-tip">当前角色下共 {{ filteredRights.length }} 项权限</span>
    </div>

    <div class="card-box">
      <table>
        <thead>
          <tr><th>权限编号</th><th>权限名称</th><th>所属角色</th><th>权限说明</th><th>状态</th><th>启用</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredRights" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="bold">{{ item.name }}</td>
            <td><span class="role-tag" :class="roleClass(item.role)">{{ item.role }}</span></td>
            <td>{{ item.desc }}</td>
            <td>
              <span class="status-tag" :class="item.checked ? 'on' : 'off'">
                {{ item.checked ? '已启用' : '未启用' }}
              </span>
            </td>
            <td><input type="checkbox" class="switch" v-model="item.checked" /></td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredRights.length === 0" class="empty-tip">该角色下暂无权限</div>
    </div>

    <p class="foot-tip">💡 演示方法：切换上方角色下拉框，表格会用 computed 自动按角色过滤；勾选 / 取消勾选，状态会立刻变成「已启用 / 未启用」。</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// 用 ref 保存权限列表
const currentRole = ref('全部')
const rightsList = ref([
  { id: 1, name: '查看用户列表', role: '管理员', desc: '浏览全部用户数据', checked: true },
  { id: 2, name: '新增删除用户', role: '管理员', desc: '添加、删除系统用户', checked: true },
  { id: 3, name: '商品查看', role: '编辑', desc: '查看全部商品信息', checked: true },
  { id: 4, name: '商品编辑', role: '编辑', desc: '修改商品价格库存', checked: false },
  { id: 5, name: '订单查看', role: '访客', desc: '仅可以查看订单', checked: true },
  { id: 6, name: '系统设置修改', role: '管理员', desc: '修改后台系统参数', checked: false }
])

// 用 computed 按角色过滤（选“全部”时返回全部）
const filteredRights = computed(() => {
  if (currentRole.value === '全部') return rightsList.value
  return rightsList.value.filter(i => i.role === currentRole.value)
})

const enabledCount = computed(() => rightsList.value.filter(i => i.checked).length)
const enabledRate = computed(() => Math.round(enabledCount.value / rightsList.value.length * 100))
const roleClass = (role) => role === '管理员' ? 'r-admin' : role === '编辑' ? 'r-edit' : 'r-guest'
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
  &.green { border-top-color: #00b578; } &.gray { border-top-color: #c0c4cc; }
  .num { font-size: 26px; font-weight: 800; color: #303133; }
  .label { color: #909399; font-size: 13px; margin-top: 4px; }
  .rate-bar { height: 7px; background: #f1ead2; border-radius: 6px; margin-top: 9px; overflow: hidden; i { display: block; height: 100%; background: linear-gradient(90deg,#ffc93c,#ff9f1a); border-radius: 6px; transition: width .3s; } }
}
.filter-card {
  background: #fff; padding: 14px 18px; border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px; font-size: 14px;
  select { padding: 8px 12px; border: 1px solid #dcdfe6; border-radius: 8px; outline: none; &:focus { border-color:#ffb52e; } }
  .count-tip { color: #909399; font-size: 13px; }
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
.bold { font-weight: 600; }
.role-tag { padding: 4px 11px; border-radius: 20px; font-size: 13px; font-weight: 600;
  &.r-admin { background:#fef0f0; color:#f56c6c; } &.r-edit { background:#e1f3ff; color:#409eff; } &.r-guest { background:#f4f4f5; color:#909399; } }
.status-tag { padding: 4px 11px; border-radius: 20px; font-size: 13px; font-weight: 600;
  &.on { background: #e7f9ef; color: #009688; } &.off { background: #f4f4f5; color: #909399; } }
.switch { width: 19px; height: 19px; accent-color: #ff9f1a; cursor: pointer; }
.empty-tip, .foot-tip { text-align: center; padding: 22px 10px 6px; color: #909399; font-size: 13.5px; }
.foot-tip { text-align: left; padding-left: 2px; }
@media (max-width: 760px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
</style>
