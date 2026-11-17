<template>
  <div class="page-wrap">
    <div class="page-header">
      <h2>👤 用户详情</h2>
      <p>从用户列表点「查看详情」进来，这里会根据网址里的用户编号显示对应的人</p>
    </div>

    <div class="card-box">
      <div class="user-avatar">
        <img :src="avatarUrl" alt="用户头像" />
        <img class="mascot-badge" src="../../assets/naidan.png" alt="奶娃" />
      </div>
      <div class="user-name">{{ userInfo.name }}</div>
      <div class="user-level"><span class="level-tag" :class="userInfo.tagClass">{{ userInfo.level }}</span></div>

      <div class="info-row"><label>用户ID：</label><span>#{{ id }}</span></div>
      <div class="info-row"><label>用户姓名：</label><span>{{ userInfo.name }}</span></div>
      <div class="info-row"><label>客户等级：</label><span>{{ userInfo.level }}（编号越大，等级序号越大）</span></div>
      <div class="info-row"><label>账号状态：</label><span class="ok">● 正常使用中</span></div>
      <div class="info-row"><label>数据来源：</label><span>网址参数 id = {{ id }}，由路由 props 传进来</span></div>

      <div class="btns">
        <button class="back-btn" @click="goBack">← 返回列表</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: String
})
const router = useRouter()
// 根据 id 生成不同在线头像
const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${props.id}`

// 和用户列表 MyUsers.vue 里保持一致的数据，按 id 找到这个人
const allUsers = [
  { id: 1, name: '小明', level: '一级客户', tagClass: 'lv1' },
  { id: 2, name: '小红', level: '二级客户', tagClass: 'lv2' },
  { id: 3, name: '小兰', level: '三级客户', tagClass: 'lv3' },
  { id: 4, name: '小芳', level: '四级客户', tagClass: 'lv4' }
]
const userInfo = computed(() => allUsers.find(u => u.id === Number(props.id)) || { name: '未知用户', level: '—', tagClass: 'lv1' })

const goBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.page-wrap { padding: 24px; min-height: 100%; }
.page-header {
  margin-bottom: 18px;
  h2 { margin: 0; color: #303133; font-size: 24px; }
  p { margin: 6px 0 0; color: #909399; font-size: 14px; }
}
.card-box {
  background: #fff; border-radius: 16px; box-shadow: 0 2px 14px rgba(0,0,0,.07);
  padding: 34px 30px; max-width: 540px;
}
.user-avatar {
  text-align: center; margin-bottom: 10px; position: relative; width: fit-content; margin-left: auto; margin-right: auto;
  img:first-child { width: 104px; height: 104px; border-radius: 50%; border: 3px solid #ffe9a8; background:#fffdf4; }
  .mascot-badge {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
    border: 3px solid #fff; position: absolute; right: -8px; bottom: 2px;
    box-shadow: 0 4px 10px rgba(0,0,0,.15); background:#fff;
  }
}
.user-name { text-align: center; font-size: 21px; font-weight: 800; color:#303133; }
.user-level { text-align: center; margin: 9px 0 24px; }
.level-tag { padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 700;
  &.lv1 { background:#e1f3ff; color:#409eff; } &.lv2 { background:#e7f9ef; color:#009688; }
  &.lv3 { background:#fff7e6; color:#e6a23c; } &.lv4 { background:#fef0f0; color:#f56c6c; } }
.info-row {
  margin-bottom: 13px; font-size: 14.5px;
  display: flex; gap: 6px;
  label { font-weight: 600; color: #606266; width: 92px; flex-shrink: 0; }
  .ok { color: #009688; font-weight: 600; }
}
.back-btn {
  margin-top: 22px; padding: 10px 22px;
  background: linear-gradient(90deg,#ffb52e,#ff9f1a); color: #fff;
  border: none; border-radius: 9px; cursor: pointer; font-weight: 700;
  box-shadow: 0 8px 18px rgba(255,159,26,.3);
  &:hover { filter: brightness(1.05); }
}
</style>
