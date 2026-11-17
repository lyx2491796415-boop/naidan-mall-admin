<template>
  <div class="header-box">
    <!-- 左：奶娃 Logo + 标题 -->
    <div class="left">
      <img class="logo" src="../../assets/naidan.png" alt="奶娃" />
      <div class="title-wrap">
        <div class="title">🛒 商城后台管理系统
          <span class="badge new">NEW</span>
          <span class="badge vip">VIP</span>
          <span class="badge msg">99+</span>
        </div>
        <div class="sub">Shop Admin System · 数据管理中心</div>
      </div>
    </div>

    <!-- 中：搜索框（真的能用：输入 用户/权限/商品/订单/设置 回车直达） -->
    <div class="search-box">
      <input v-model="keyword" placeholder="搜索商品、订单、用户… 回车直达页面" @keyup.enter="goSearch" />
      <button @click="goSearch">搜索</button>
    </div>

    <!-- 右：欢迎语 + 退出 -->
    <div class="user-info">
      <img class="avatar" src="../../assets/naidan.png" alt="头像" />
      <div class="welcome">
        <div class="hi">👋 欢迎回来，奶娃</div>
        <div class="day">今天也是努力学习的一天 ~</div>
      </div>
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const keyword = ref('')

// 顶部搜索：按关键字跳到对应管理页面，演示时一眼就能看懂
const goSearch = () => {
  const k = keyword.value.trim()
  if (!k) return
  if (k.includes('订单')) router.push('/home/orders')
  else if (k.includes('商品')) router.push('/home/goods')
  else if (k.includes('权限')) router.push('/home/rights')
  else if (k.includes('设置') || k.includes('系统')) router.push('/home/settings')
  else router.push('/home/users')
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-box {
  min-height: 68px;
  background: linear-gradient(90deg, #3d8f86, #57aca2);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 8px 22px;
  box-shadow: 0 4px 18px rgba(31, 94, 88, .25);
  position: relative;
  z-index: 5;
  flex-wrap: wrap;
}
.left {
  display: flex; align-items: center; gap: 12px; min-width: 0;
  .logo {
    width: 46px; height: 46px; border-radius: 50%;
    border: 2.5px solid #ffe27a; object-fit: cover; background: #fff;
  }
  .title { font-size: 19px; font-weight: 800; display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .sub { font-size: 11.5px; opacity: .85; margin-top: 2px; letter-spacing: .4px; }
  .badge {
    font-size: 10px; font-weight: 800; padding: 2.5px 8px; border-radius: 20px; line-height: 1.4;
    &.new { background: #ff5a5a; }
    &.vip { background: #ffb52e; color: #5c3d00; }
    &.msg { background: #39c26d; }
  }
}
.search-box {
  flex: 1;
  max-width: 430px;
  display: flex;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,.14);
  input {
    flex: 1; border: none; outline: none; padding: 10px 18px; font-size: 14px; min-width: 120px;
  }
  button {
    border: none; background: #2f7f76; color: #fff;
    padding: 0 24px; cursor: pointer; font-size: 14px; font-weight: 600;
    &:hover { background: #276b63; }
  }
}
.user-info {
  display: flex; align-items: center; gap: 11px;
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.25);
  padding: 6px 8px 6px 10px;
  border-radius: 40px;
  .avatar { width: 38px; height: 38px; border-radius: 50%; border: 2px solid #ffe27a; object-fit: cover; background:#fff; }
  .hi { font-size: 13.5px; font-weight: 700; }
  .day { font-size: 11px; opacity: .85; }
  .logout-btn {
    padding: 7px 14px;
    background: #fff; color: #2f7f76;
    border: none; border-radius: 20px; cursor: pointer;
    font-weight: 700; font-size: 13px;
    &:hover { background: #fff3cf; }
  }
}
@media (max-width: 900px) {
  .search-box { order: 3; max-width: none; flex-basis: 100%; }
}
</style>
