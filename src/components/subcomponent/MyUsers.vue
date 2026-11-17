<template>
  <div class="page-wrap">
    <div class="page-header">
      <div>
        <h2>👤 用户管理</h2>
        <p>管理后台全部系统用户信息，点击「查看详情」可以进入用户详情页</p>
      </div>
      <img class="header-mascot" src="../../assets/naidan.png" alt="奶娃" />
    </div>

    <!-- 数据概览：一眼看明白有多少用户 -->
    <div class="stat-row">
      <div class="stat-card"><div class="num">{{ userlist.length }}</div><div class="label">用户总数</div></div>
      <div class="stat-card"><div class="num">1</div><div class="label">一级客户</div></div>
      <div class="stat-card"><div class="num">1</div><div class="label">二级客户</div></div>
      <div class="stat-card"><div class="num">2</div><div class="label">三 / 四级客户</div></div>
    </div>

    <div class="filter-card">
      <span>🔎</span>
      <input v-model="keyword" placeholder="输入姓名搜索用户，例如：小明" />
      <span class="count-tip">当前显示 {{ filteredUsers.length }} 人</span>
    </div>

    <div class="card-box">
      <table>
        <thead>
          <tr><th>编号</th><th>姓名</th><th>客户等级</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredUsers" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="name-cell"><img src="../../assets/naidan.png" alt="" />{{ item.name }}</td>
            <td><span class="level-tag" :class="item.tagClass">{{ item.level }}</span></td>
            <td><router-link :to="'/home/users/' + item.id" class="btn-link">查看详情 →</router-link></td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredUsers.length === 0" class="empty-tip">暂无符合条件的用户，换个姓名试试</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const userlist = [
  { id: 1, name: '小明', level: '一级客户', tagClass: 'lv1' },
  { id: 2, name: '小红', level: '二级客户', tagClass: 'lv2' },
  { id: 3, name: '小兰', level: '三级客户', tagClass: 'lv3' },
  { id: 4, name: '小芳', level: '四级客户', tagClass: 'lv4' }
]
const keyword = ref('')
const filteredUsers = computed(() => userlist.filter(u => u.name.includes(keyword.value)))
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
  .num { font-size: 26px; font-weight: 800; color: #303133; }
  .label { color: #909399; font-size: 13px; margin-top: 4px; }
}
.filter-card {
  background:#fff; padding: 13px 18px; border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
  input { flex: 1; max-width: 340px; padding: 9px 13px; border: 1px solid #dcdfe6; border-radius: 8px; outline: none; &:focus { border-color:#ffb52e; } }
  .count-tip { color:#909399; font-size: 13px; }
}
.card-box {
  background: #fff; border-radius: 14px; box-shadow: 0 2px 14px rgba(0,0,0,.07); overflow: hidden;
  table {
    width: 100%; border-collapse: collapse;
    th { background: #fff8e1; padding: 14px; text-align: left; color: #7a5c00; font-size: 14px; }
    td { padding: 14px; border-top: 1px solid #f3ecd9; vertical-align: middle; }
    tbody tr:hover { background: #fffdf4; }
  }
}
.name-cell { font-weight: 600; img { width: 26px; height: 26px; border-radius: 50%; vertical-align: -7px; margin-right: 8px; object-fit: cover; } }
.level-tag {
  padding: 4px 11px; border-radius: 20px; font-size: 13px; font-weight: 600;
  &.lv1 { background: #e1f3ff; color: #409eff; }
  &.lv2 { background: #e7f9ef; color: #009688; }
  &.lv3 { background: #fff7e6; color: #e6a23c; }
  &.lv4 { background: #fef0f0; color: #f56c6c; }
}
.btn-link { color: #e8930c; text-decoration: none; font-size: 14px; font-weight: 600; &:hover { text-decoration: underline; } }
.empty-tip { text-align: center; padding: 35px 0; color: #909399; }
@media (max-width: 760px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
</style>
