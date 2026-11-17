<template>
  <div class="page-wrap">
    <div class="page-header">
      <div>
        <h2>⚙️ 系统设置</h2>
        <p>第 5 章 · 后台站点基础参数配置，保存后刷新页面也不会丢（存在 localStorage 里）</p>
      </div>
      <img class="header-mascot" src="../../assets/naidan.png" alt="奶娃" />
    </div>

    <div class="setting-layout">
      <!-- 左：设置表单 -->
      <div class="card-box setting-card">
        <div class="setting-item">
          <label>站点名称</label>
          <input v-model="form.siteName" placeholder="请输入站点名称" />
        </div>
        <div class="setting-item">
          <label>客服电话</label>
          <input v-model="form.phone" placeholder="请输入客服电话" />
        </div>
        <div class="setting-item">
          <label>每页显示条数</label>
          <input v-model.number="form.pageSize" type="number" />
        </div>
        <div class="setting-item">
          <label>是否开放注册</label>
          <div class="switch-line">
            <input type="checkbox" class="switch" v-model="form.openRegister" />
            <span>{{ form.openRegister ? '已开放注册，新用户可以自己注册' : '已关闭注册，只能管理员添加' }}</span>
          </div>
        </div>
        <div class="btns">
          <button class="save-btn" @click="saveSetting">💾 保存设置</button>
          <button class="reset-btn" @click="resetDefault">恢复默认</button>
        </div>
        <p v-if="savedTip" class="saved-tip">{{ savedTip }}</p>
      </div>

      <!-- 右：实时预览，改左边这里马上变 -->
      <div class="card-box preview-card">
        <div class="preview-title">实时预览</div>
        <img src="../../assets/naidan.png" alt="奶娃" />
        <div class="preview-name">{{ form.siteName || '（未填写站点名称）' }}</div>
        <div class="preview-row">📞 客服电话：{{ form.phone || '—' }}</div>
        <div class="preview-row">📄 每页显示：{{ form.pageSize }} 条</div>
        <div class="preview-row">📝 开放注册：<span :class="form.openRegister ? 'ok' : 'no'">{{ form.openRegister ? '开放中' : '已关闭' }}</span></div>
        <p class="preview-tip">你在左边改，这里立刻跟着变，这就是 v-model 双向绑定。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
// 用 reactive 保存设置，另存一份 defaultForm 作重置依据
const defaultForm = {
  siteName: '商城管理后台',
  phone: '400-888-6666',
  pageSize: 8,
  openRegister: true
}
const form = reactive({ ...defaultForm })
const savedTip = ref('')

// onMounted 时从 localStorage 读取已保存的设置，并用 Object.assign 合并到 form
onMounted(() => {
  const cache = localStorage.getItem('systemSettings')
  if (cache) {
    Object.assign(form, JSON.parse(cache))
  }
})

// 把设置存为 JSON 存进 localStorage
const saveSetting = () => {
  localStorage.setItem('systemSettings', JSON.stringify(form))
  savedTip.value = '✅ 设置已保存，刷新页面再进来还是这个配置'
  alert('✅设置保存成功')
}
// 还原默认并清掉缓存
const resetDefault = () => {
  Object.assign(form, defaultForm)
  localStorage.removeItem('systemSettings')
  savedTip.value = '已恢复默认配置'
  alert('已恢复默认配置')
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
.setting-layout { display: flex; gap: 18px; align-items: flex-start; flex-wrap: wrap; }
.card-box { background: #fff; border-radius: 14px; box-shadow: 0 2px 14px rgba(0,0,0,.07); }
.setting-card { width: 600px; max-width: 100%; padding: 30px; }
.setting-item {
  margin-bottom: 22px; display: flex; align-items: center;
  label { width: 120px; font-size: 14px; color: #303133; font-weight: 600; flex-shrink: 0; }
  > input {
    flex: 1; padding: 11px 13px; border: 1.5px solid #e6e0cd; border-radius: 9px; outline: none; font-size: 14.5px;
    &:focus { border-color: #ffb52e; box-shadow: 0 0 0 4px rgba(255,181,46,.14); }
  }
}
.switch-line { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #606266;
  .switch { width: 20px; height: 20px; accent-color: #ff9f1a; cursor: pointer; } }
.btns { margin-top: 30px; display: flex; gap: 14px;
  .save-btn {
    padding: 11px 24px; background: linear-gradient(90deg,#ffb52e,#ff9f1a); color: #fff;
    border: none; border-radius: 9px; cursor: pointer; font-weight: 700; font-size: 15px;
    box-shadow: 0 8px 18px rgba(255,159,26,.32); &:hover { filter: brightness(1.05); }
  }
  .reset-btn { padding: 11px 22px; background: #f4f4f5; color: #606266; border: none; border-radius: 9px; cursor: pointer; font-weight: 600; &:hover { background:#e9e9eb; } }
}
.saved-tip { margin-top: 16px; color: #009688; background:#e7f9ef; padding: 10px 14px; border-radius: 8px; font-size: 13.5px; }
.preview-card {
  width: 300px; padding: 26px; text-align: center;
  background: linear-gradient(180deg, #fffdf4, #fff6da);
  border: 1.5px dashed #ecd28a;
  .preview-title { font-weight: 800; color:#7a5c00; letter-spacing: 2px; font-size: 13px; }
  img { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 4px solid #ffe27a; margin: 16px 0 10px; background:#fff; }
  .preview-name { font-size: 19px; font-weight: 800; color:#303133; margin-bottom: 12px; }
  .preview-row { font-size: 14px; color:#606266; margin-bottom: 9px; .ok { color:#009688; font-weight:700; } .no { color:#f56c6c; font-weight:700; } }
  .preview-tip { font-size: 12.5px; color:#a07d2c; margin-top: 14px; line-height: 1.6; }
}
</style>
