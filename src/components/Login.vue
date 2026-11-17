<template>
  <div class="login-wrap">
    <div class="login-card">
      <!-- 左边：奶娃品牌区 -->
      <div class="brand-side">
        <img class="mascot" src="../assets/naidan.png" alt="奶娃" />
        <h1>商城后台管理系统</h1>
        <p class="brand-sub">Shop Admin System · 数据管理中心</p>
        <div class="brand-tags">
          <span>用户管理</span><span>权限管理</span><span>商品管理</span><span>订单管理</span>
        </div>
        <p class="brand-tip">奶娃陪你一起，把后台管得明明白白。</p>
      </div>

      <!-- 右边：登录表单 -->
      <div class="form-side">
        <h2>欢迎回来 👋</h2>
        <p class="form-tip">请登录你的管理员账号</p>
        <div class="item">
          <label>用户名</label>
          <input v-model="username" placeholder="请输入用户名" @keyup.enter="handleLogin" />
        </div>
        <div class="item">
          <label>密码</label>
          <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
        </div>
        <button class="login-btn" @click="handleLogin">登 录</button>
        <div class="demo-tip">演示账号：<b>admin</b> &nbsp; 密码：<b>123456</b></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '123456') {
    localStorage.setItem('token', 'admin-token-001')
    router.push('/home')
  } else {
    alert('账号密码错误！admin / 123456')
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fff3cf 0%, #ffe9a8 45%, #ffd66e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.login-card {
  width: 880px;
  max-width: 100%;
  min-height: 480px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(146, 96, 0, .22);
  display: flex;
  overflow: hidden;
}
.brand-side {
  width: 46%;
  background: linear-gradient(160deg, #ffdf7e, #ffb52e);
  padding: 42px 34px;
  text-align: center;
  color: #5c3d00;
  .mascot {
    width: 168px;
    height: 168px;
    object-fit: cover;
    border-radius: 50%;
    border: 6px solid rgba(255,255,255,.75);
    box-shadow: 0 14px 30px rgba(146, 96, 0, .28);
    background: #fff;
  }
  h1 { font-size: 25px; margin: 20px 0 8px; letter-spacing: 1px; }
  .brand-sub { font-size: 13px; opacity: .75; }
  .brand-tags {
    margin: 22px 0 14px;
    display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
    span {
      background: rgba(255,255,255,.55);
      padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
    }
  }
  .brand-tip { font-size: 13px; opacity: .85; }
}
.form-side {
  flex: 1;
  padding: 52px 46px;
  h2 { font-size: 26px; color: #303133; }
  .form-tip { color: #909399; font-size: 14px; margin: 8px 0 30px; }
}
.item {
  margin-bottom: 20px;
  label { display: block; margin-bottom: 7px; font-size: 14px; font-weight: 600; color: #606266; }
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #e6e0cd;
    border-radius: 10px;
    outline: none;
    font-size: 15px;
    transition: .2s;
    &:focus { border-color: #ffb52e; box-shadow: 0 0 0 4px rgba(255,181,46,.16); }
  }
}
.login-btn {
  width: 100%;
  padding: 13px;
  margin-top: 6px;
  background: linear-gradient(90deg, #ffb52e, #ff9f1a);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(255,159,26,.35);
  &:hover { filter: brightness(1.05); }
  &:active { transform: translateY(1px); }
}
.demo-tip {
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: #a07d2c;
  background: #fff8e1;
  border: 1px dashed #ecd28a;
  padding: 9px;
  border-radius: 8px;
}
@media (max-width: 720px) {
  .login-card { flex-direction: column; }
  .brand-side { width: 100%; padding: 28px 20px; .mascot { width: 110px; height: 110px; } }
  .form-side { padding: 30px 24px 36px; }
}
</style>
