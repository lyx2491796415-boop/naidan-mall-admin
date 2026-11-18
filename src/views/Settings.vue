<template>
  <div>
    <PageHeader title="系统设置" subtitle="配置站点基础信息，保存后自动持久化">
      <button class="btn-primary" @click="save"><Icon name="check" :size="16" /> 保存设置</button>
    </PageHeader>

    <div class="settings-grid">
      <div class="panel form-panel">
        <h3>基础信息</h3>
        <div class="field"><label>站点名称</label><input v-model="form.siteName" placeholder="输入站点名称" /></div>
        <div class="field"><label>客服电话</label><input v-model="form.phone" placeholder="输入客服电话" /></div>
        <div class="field"><label>默认货币符号</label><input v-model="form.currency" maxlength="3" /></div>
        <div class="field"><label>每页显示条数</label><input v-model.number="form.pageSize" type="number" min="5" max="50" /></div>
        <div class="divider"></div>
        <h3>功能开关</h3>
        <div class="switch-row"><div><strong>开放用户注册</strong><small>允许访客自行注册账号</small></div><button class="switch" :class="{ on: form.openRegister }" @click="form.openRegister = !form.openRegister"><i></i></button></div>
        <div class="switch-row"><div><strong>深色主题</strong><small>切换整个后台的视觉风格</small></div><button class="switch" :class="{ on: store.dark }" @click="store.dark = !store.dark"><i></i></button></div>
        <div class="actions"><button class="btn-ghost" @click="reset">恢复默认</button></div>
      </div>

      <div class="panel preview-panel">
        <h3>实时预览 <span>边改边看</span></h3>
        <div class="preview-card">
          <div class="pv-head"><Mascot mood="love" :size="64" /><strong>{{ form.siteName || '站点名称' }}</strong></div>
          <div class="pv-line"><Icon name="mood" :size="16" /><span>客服热线</span><b>{{ form.phone || '—' }}</b></div>
          <div class="pv-line"><Icon name="cart" :size="16" /><span>每页显示</span><b>{{ form.pageSize }} 条</b></div>
          <div class="pv-line"><Icon name="users" :size="16" /><span>开放注册</span><b :class="form.openRegister ? 'yes' : 'no'">{{ form.openRegister ? '已开放' : '已关闭' }}</b></div>
          <div class="pv-foot"><Mascot mood="wink" :size="40" /><span>让每一笔生意都有温度</span></div>
        </div>
        <p class="tip">左侧表单改动会实时同步到这里，点击「保存设置」后刷新页面依然生效。</p>
      </div>
    </div>

    <transition name="page"><div v-if="saved" class="toast"><Icon name="check" :size="18" /> 设置已保存</div></transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import Icon from '../components/Icon.vue'
import Mascot from '../components/Mascot.vue'
import { store } from '../store'

const defaults = { siteName: '奶娃商城', phone: '400-888-6666', pageSize: 10, openRegister: true, currency: '¥' }
const form = reactive({ ...store.settings })
const saved = ref(false)
const save = () => {
  Object.assign(store.settings, form)
  saved.value = true
  setTimeout(() => { saved.value = false }, 2200)
}
const reset = () => { Object.assign(form, defaults); Object.assign(store.settings, defaults) }
</script>

<style scoped>
.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.settings-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 24px 26px; box-shadow: var(--shadow-sm); }
.panel h3 { font-size: 15px; margin-bottom: 18px; }
.field { margin-bottom: 17px; }
.field label { display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 7px; color: var(--ink-2); }
.field input { width: 100%; border: 1px solid var(--line); background: var(--bg); border-radius: 10px; padding: 11px 13px; outline: none; transition: .2s; }
.field input:focus { border-color: var(--gold-4); box-shadow: 0 0 0 4px rgba(237,166,42,.12); }
.divider { height: 1px; background: var(--line); margin: 24px 0; }
.switch-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
.switch-row strong { display: block; font-size: 13px; } .switch-row small { font-size: 11.5px; color: var(--muted); }
.switch { width: 46px; height: 26px; border-radius: 20px; border: none; background: #cfd4dd; position: relative; transition: .2s; flex-shrink: 0; }
.switch i { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.switch.on { background: var(--ok); } .switch.on i { left: 23px; }
.actions { margin-top: 22px; display: flex; justify-content: flex-end; }
.btn-ghost { padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; background: var(--bg-soft); border: 1px solid var(--line); }
.preview-panel h3 span { font-size: 11px; color: var(--gold-5); background: var(--gold-1); padding: 2px 8px; border-radius: 6px; margin-left: 6px; }
.preview-card { background: linear-gradient(160deg, #fffaf0, #fff3d9); border: 1px solid var(--gold-2); border-radius: var(--r-md); padding: 24px; color: #5a3a05; }
:global(body.dark) .preview-card { background: linear-gradient(160deg, #2a2619, #332c19); border-color: #5a4a22; color: #f0d99a; }
.pv-head { text-align: center; margin-bottom: 20px; }
.pv-head :deep(.mascot) { margin: 0 auto 8px; }
.pv-head strong { display: block; font-size: 18px; }
.pv-line { display: flex; align-items: center; gap: 10px; font-size: 12.5px; padding: 10px 0; border-bottom: 1px dashed rgba(160,120,30,.25); }
.pv-line span { opacity: .7; } .pv-line b { margin-left: auto; } .pv-line .yes { color: var(--ok); } .pv-line .no { color: var(--danger); }
.pv-foot { display: flex; align-items: center; gap: 9px; margin-top: 18px; font-size: 12px; opacity: .8; }
.tip { font-size: 11.5px; color: var(--muted); margin-top: 14px; line-height: 1.6; }
.toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: var(--ink); color: var(--card); padding: 12px 22px; border-radius: 12px; font-size: 13px; display: flex; align-items: center; gap: 8px; box-shadow: var(--shadow-md); z-index: 200; }
@media (max-width: 900px) { .settings-grid { grid-template-columns: 1fr; } }
</style>
