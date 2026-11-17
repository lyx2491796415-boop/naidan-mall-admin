<template>
  <div class="aside">
    <!-- 顶部：奶娃管理员卡片 -->
    <div class="admin-card">
      <img src="../../assets/naidan.png" alt="奶娃" />
      <div>
        <div class="name">管理员 admin</div>
        <div class="online"><i></i> 在线 · 超级管理员</div>
      </div>
    </div>

    <div class="menu-title">功能菜单</div>

    <!-- 菜单顺序按作业要求：用户 → 权限 → 商品 → 订单 → 设置 -->
    <router-link to="/home/users"><span class="ico">👤</span>用户管理</router-link>
    <router-link to="/home/rights"><span class="ico">🔐</span>权限管理</router-link>
    <router-link to="/home/goods"><span class="ico">🛍️</span>商品管理</router-link>
    <router-link to="/home/orders"><span class="ico">📦</span>订单管理</router-link>
    <router-link to="/home/settings"><span class="ico">⚙️</span>系统设置</router-link>

    <!-- 底部：奶娃小提示 -->
    <div class="aside-tip">
      <img src="../../assets/naidan.png" alt="" />
      <p>奶娃提示<br /><span>点上面的菜单，就能切换不同管理页面哦</span></p>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.aside {
  width: 196px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #22364a, #1b2a3a);
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}
.admin-card {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 14px;
  img { width: 42px; height: 42px; border-radius: 50%; border: 2px solid #ffe27a; object-fit: cover; background:#fff; }
  .name { color: #fff; font-size: 14px; font-weight: 700; }
  .online {
    color: #9fb3c8; font-size: 11.5px; margin-top: 3px;
    display: flex; align-items: center; gap: 5px;
    i { width: 7px; height: 7px; border-radius: 50%; background: #39c26d; display: inline-block; }
  }
}
.menu-title {
  color: #7e93a9; font-size: 11px; letter-spacing: 2px;
  padding: 2px 10px 8px;
}
.aside a {
  display: flex; align-items: center; gap: 10px;
  height: 48px; line-height: 48px;
  color: #c3d0de;
  text-decoration: none;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 14.5px;
  transition: .18s;
  .ico { font-size: 16px; }
  &:hover { background: rgba(255,255,255,.08); color: #fff; }
}
.aside .router-link-active {
  background: linear-gradient(90deg, #ffb52e, #ff9f1a);
  color: #402e00;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(255,159,26,.35);
}
.aside-tip {
  margin-top: auto;
  background: rgba(255, 213, 94, .12);
  border: 1px dashed rgba(255, 213, 94, .45);
  border-radius: 14px;
  padding: 12px;
  display: flex; gap: 9px; align-items: flex-start;
  img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; background:#fff; flex-shrink: 0; }
  p { color: #ffe9a8; font-size: 12.5px; font-weight: 700; line-height: 1.55; span { color: #d9c98d; font-weight: 400; } }
}
</style>
