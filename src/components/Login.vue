<template>
  <div class="login">
    <div class="glow glow-a"></div><div class="glow glow-b"></div>

    <div class="card">
      <div class="brand">
        <div class="brand-deco">
          <div class="orbit orbit-1"><Mascot mood="wink" :size="150" /></div>
          <span class="spark s1"></span><span class="spark s2"></span><span class="spark s3"></span>
        </div>
        <div class="brand-copy">
          <div class="logo-line"><Mascot mood="cool" :size="34" /><strong>奶娃商城</strong></div>
          <h1>让每一笔生意<br />都有温度</h1>
          <p>一个更懂你的后台管理中心。经营数据、用户、商品与订单，尽在掌握。</p>
          <div class="points">
            <span><Icon name="check" :size="15" /> 实时经营看板</span>
            <span><Icon name="check" :size="15" /> 全流程订单管理</span>
            <span><Icon name="check" :size="15" /> 奶娃 24h 陪护</span>
          </div>
        </div>
      </div>

      <div class="form-side">
        <div class="form-inner">
          <Mascot class="form-mascot" mood="happy" :size="66" />
          <h2>欢迎回来</h2>
          <p class="tip">登录后开始管理你的商城</p>

          <label>账号</label>
          <div class="field"><Icon name="users" :size="18" /><input v-model="username" placeholder="请输入管理员账号" @keyup.enter="submit" /></div>
          <label>密码</label>
          <div class="field"><Icon name="shield" :size="18" /><input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="submit" /></div>

          <div class="row"><label class="remember"><input type="checkbox" v-model="remember" /> 记住我</label><a>忘记密码？</a></div>

          <button class="login-btn" :disabled="loading" @click="submit">
            <span v-if="!loading">登 录</span><span v-else class="spinner"></span>
          </button>
          <div class="demo">演示账号 <b>admin</b> · 密码 <b>123456</b></div>
        </div>
      </div>
    </div>
    <p class="copy">© 2026 奶娃商城 · 用爱与代码构建</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Mascot from '../components/Mascot.vue'
import Icon from '../components/Icon.vue'

const router = useRouter()
const username = ref('admin')
const password = ref('123456')
const remember = ref(true)
const loading = ref(false)

const submit = () => {
  if (!username.value || !password.value) return
  loading.value = true
  setTimeout(() => {
    if (username.value === 'admin' && password.value === '123456') {
      localStorage.setItem('token', 'nd-admin-token')
      router.push('/home/dashboard')
    } else {
      loading.value = false
      alert('账号或密码不正确，请用演示账号登录')
    }
  }, 550)
}
</script>

<style scoped>
.login { min-height: 100vh; display: grid; place-items: center; padding: 24px; position: relative; overflow: hidden; background: radial-gradient(1200px 600px at 15% 10%, #fff4d6, transparent 60%), radial-gradient(900px 600px at 90% 90%, #ffe6c7, transparent 55%), #fbf7ef; }
.glow { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .5; }
.glow-a { width: 380px; height: 380px; background: #ffd977; top: -120px; left: -100px; }
.glow-b { width: 320px; height: 320px; background: #ffb98a; bottom: -120px; right: -80px; }
.card { width: 940px; max-width: 100%; min-height: 560px; background: rgba(255, 255, 255, .82); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, .9); border-radius: 28px; box-shadow: 0 30px 80px rgba(160, 110, 30, .18); display: grid; grid-template-columns: 1.05fr 1fr; overflow: hidden; position: relative; z-index: 1; }
.brand { background: linear-gradient(150deg, #f7b733, #e8931c); color: #5a3a05; padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
.brand::after { content: ''; position: absolute; width: 300px; height: 300px; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; right: -120px; bottom: -120px; }
.brand-deco { display: flex; justify-content: center; margin-bottom: 18px; }
.orbit { animation: floaty 5s ease-in-out infinite; }
.spark { position: absolute; background: #fff; border-radius: 50%; opacity: .85; }
.s1 { width: 8px; height: 8px; top: 18%; left: 22%; } .s2 { width: 5px; height: 5px; top: 30%; right: 20%; } .s3 { width: 6px; height: 6px; top: 12%; right: 32%; }
.logo-line { display: flex; align-items: center; gap: 8px; font-size: 15px; letter-spacing: 1px; margin-bottom: 16px; }
.brand-copy h1 { font-size: 34px; line-height: 1.25; font-weight: 800; letter-spacing: -.5px; }
.brand-copy > p { font-size: 13.5px; line-height: 1.7; margin: 14px 0 22px; opacity: .82; max-width: 340px; }
.points { display: flex; flex-direction: column; gap: 9px; }
.points span { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
.form-side { display: grid; place-items: center; padding: 40px; background: var(--card); }
.form-inner { width: 100%; max-width: 330px; }
.form-mascot { margin: 0 auto 8px; animation: floaty 4s ease-in-out infinite; }
.form-inner h2 { font-size: 26px; font-weight: 700; text-align: center; }
.tip { text-align: center; color: var(--muted); font-size: 13px; margin: 6px 0 24px; }
.form-inner > label { display: block; font-size: 12.5px; font-weight: 600; margin: 15px 0 7px; color: var(--ink-2); }
.field { display: flex; align-items: center; gap: 10px; border: 1.5px solid var(--line); border-radius: 12px; padding: 0 14px; color: var(--muted); transition: .2s; }
.field:focus-within { border-color: var(--gold-4); box-shadow: 0 0 0 4px rgba(237, 166, 42, .12); color: var(--gold-5); }
.field input { flex: 1; border: none; outline: none; background: transparent; padding: 12px 0; font-size: 14px; }
.row { display: flex; justify-content: space-between; align-items: center; margin: 14px 0 20px; font-size: 12.5px; }
.remember { display: flex; align-items: center; gap: 6px; color: var(--muted); }
.row a { color: var(--gold-5); font-weight: 600; }
.login-btn { width: 100%; padding: 13px; border: none; border-radius: 12px; background: linear-gradient(90deg, #f7b733, #e8931c); color: #fff; font-size: 15px; font-weight: 700; letter-spacing: 4px; box-shadow: 0 12px 24px rgba(232, 147, 28, .32); transition: .2s; display: grid; place-items: center; height: 47px; }
.login-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }
.login-btn:disabled { opacity: .7; }
.spinner { width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.demo { text-align: center; margin-top: 16px; font-size: 12px; color: var(--muted); background: var(--bg-soft); padding: 9px; border-radius: 9px; }
.demo b { color: var(--gold-5); }
.copy { position: absolute; bottom: 16px; font-size: 11px; color: #b9a684; z-index: 1; }
@media (max-width: 820px) { .card { grid-template-columns: 1fr; } .brand { display: none; } }
</style>
