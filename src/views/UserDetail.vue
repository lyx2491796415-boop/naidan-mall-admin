<template>
  <div>
    <PageHeader title="用户详情" subtitle="查看会员完整资料与消费记录">
      <button class="btn-ghost" @click="$router.back()"><Icon name="back" :size="16" /> 返回列表</button>
    </PageHeader>

    <div class="detail-grid">
      <div class="panel profile-card">
        <div class="avatar-box"><Mascot :mood="mood" :size="120" /><span class="badge"><Icon name="check" :size="14" /></span></div>
        <h2>{{ user.name }}</h2>
        <span class="level" :class="levelCls(user.level)">{{ user.level }}</span>
        <div class="mini-stats">
          <div><strong>{{ money(user.spend) }}</strong><span>累计消费</span></div>
          <div><strong>{{ Math.round(user.spend / 120) }}</strong><span>订单数</span></div>
          <div><strong>{{ user.city }}</strong><span>所在城市</span></div>
        </div>
        <button class="btn-primary" @click="message"><Icon name="mood" :size="16" /> 发送消息</button>
      </div>

      <div class="panel info-card">
        <h3>基本资料</h3>
        <div class="info-list">
          <div><span>用户编号</span><b>#{{ String(user.id).padStart(4, '0') }}</b></div>
          <div><span>联系电话</span><b>{{ user.phone }}</b></div>
          <div><span>注册时间</span><b>{{ user.joined }}</b></div>
          <div><span>会员等级</span><b>{{ user.level }}</b></div>
          <div><span>账号状态</span><b class="ok">● 正常使用中</b></div>
        </div>

        <h3 class="mt">消费趋势</h3>
        <div class="bars">
          <div v-for="(h, i) in bars" :key="i" class="bar-col"><i :style="{ height: h + '%' }"></i><small>{{ i + 1 }}月</small></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import Icon from '../components/Icon.vue'
import Mascot from '../components/Mascot.vue'
import { store, money } from '../store'

const props = defineProps({ id: String })
const user = computed(() => store.users.find(u => u.id === Number(props.id)) || store.users[0])
const mood = computed(() => ['happy', 'cool', 'love', 'wink', 'smug', 'shocked'][Number(props.id) % 6])
const levelCls = l => ({ '钻石会员': 'lv-diamond', '黄金会员': 'lv-gold', '白银会员': 'lv-silver', '普通会员': 'lv-normal' }[l])
const bars = computed(() => Array.from({ length: 6 }, (_, i) => 30 + ((Number(props.id) * 17 + i * 23) % 65)))
const message = () => alert(`已向 ${user.value.name} 发送问候（演示）`)
</script>

<style scoped>
.btn-ghost, .btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; }
.btn-ghost { background: var(--card); border: 1px solid var(--line); }
.btn-primary { background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.detail-grid { display: grid; grid-template-columns: 340px 1fr; gap: 18px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-sm); }
.profile-card { padding: 30px; text-align: center; }
.avatar-box { position: relative; width: 120px; margin: 0 auto 14px; }
.avatar-box :deep(.mascot) { border-radius: 50%; background: var(--gold-1); }
.badge { position: absolute; right: 4px; bottom: 6px; width: 28px; height: 28px; border-radius: 50%; background: var(--ok); color: #fff; display: grid; place-items: center; border: 3px solid var(--card); }
.profile-card h2 { font-size: 20px; }
.level { display: inline-block; margin-top: 8px; padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
.lv-diamond { background: #eef0ff; color: #6c63d8; } .lv-gold { background: #fff3d9; color: #c8800c; } .lv-silver { background: #eef1f4; color: #7c8796; } .lv-normal { background: #f3f4f6; color: #98a0ad; }
.mini-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 24px 0; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.mini-stats strong { display: block; font-size: 14px; } .mini-stats span { font-size: 10.5px; color: var(--muted); }
.profile-card .btn-primary { width: 100%; justify-content: center; }
.info-card { padding: 26px 28px; }
.info-card h3 { font-size: 15px; } .info-card h3.mt { margin-top: 26px; }
.info-list { margin-top: 16px; }
.info-list > div { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 13px; }
.info-list span { color: var(--muted); } .info-list b { font-weight: 600; } .info-list .ok { color: var(--ok); }
.bars { display: flex; align-items: flex-end; gap: 12px; height: 130px; margin-top: 18px; padding-top: 10px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; gap: 6px; }
.bar-col i { width: 100%; max-width: 42px; background: linear-gradient(180deg, #f7b733, #e8931c); border-radius: 6px 6px 0 0; transition: height .6s; }
.bar-col small { font-size: 10px; color: var(--muted); }
@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
</style>
