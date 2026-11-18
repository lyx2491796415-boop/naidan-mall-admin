<template>
  <div>
    <PageHeader title="奶娃表情馆" subtitle="今日份快乐已就位，点击卡片复制文案">
      <button class="btn-primary" @click="shuffle"><Icon name="mood" :size="16" /> 随机来一个</button>
    </PageHeader>

    <div class="hero">
      <div class="hero-mascot"><Mascot :mood="featured.mood" :size="150" /><span class="ring"></span></div>
      <div class="hero-copy">
        <span class="tag">🌟 今日主打</span>
        <h2>{{ featured.text }}</h2>
        <p>{{ featured.sub }}</p>
        <button @click="copy(featured.text)"><Icon name="copy" :size="16" /> 复制这句</button>
      </div>
      <div class="bubbles"><span>666</span><span>绝绝子</span><span>yyds</span></div>
    </div>

    <div class="filter-row">
      <button v-for="c in cats" :key="c" :class="{ active: cat === c }" @click="cat = c">{{ c }}</button>
    </div>

    <div class="meme-grid">
      <div v-for="(m, i) in shown" :key="m.text" class="meme-card" :style="{ animationDelay: (i * .04) + 's' }" @click="copy(m.text)">
        <div class="meme-face" :class="'bg-' + (i % 5)"><Mascot :mood="m.mood" :size="104" /></div>
        <div class="meme-text">{{ m.text }}</div>
        <div class="meme-foot"><span>{{ m.cat }}</span><Icon name="copy" :size="15" /></div>
      </div>
    </div>

    <transition name="page"><div v-if="toast" class="toast"><Icon name="check" :size="17" /> 已复制：「{{ toast }}」</div></transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import Icon from '../components/Icon.vue'
import Mascot from '../components/Mascot.vue'

const memes = [
  { mood: 'happy', text: '今天也要元气满满鸭！', sub: '奶娃为你注入快乐能量', cat: '打气' },
  { mood: 'cool', text: '稳住，我们能赢', sub: '戴上墨镜就是整条街最靓的娃', cat: '酷拽' },
  { mood: 'love', text: '绝绝子！爱了爱了', sub: '看到好东西眼睛都发光', cat: '种草' },
  { mood: 'shocked', text: '啊？这是真的吗？', sub: '震惊到失语的奶娃', cat: '吃瓜' },
  { mood: 'wink', text: '懂的都懂 😉', sub: '一个眼神胜过千言万语', cat: '酷拽' },
  { mood: 'sleepy', text: '困了，先睡为敬', sub: 'zzz 别打扰我做梦', cat: '摆烂' },
  { mood: 'angry', text: '我大意了啊！', sub: '气到冒烟的暴躁奶娃', cat: '发疯' },
  { mood: 'cry', text: '呜呜呜破防了', sub: '眼泪汪汪求安慰', cat: '发疯' },
  { mood: 'smug', text: '略略略~ 就是这么优秀', sub: '得意洋洋的小表情', cat: '酷拽' },
  { mood: 'dizzy', text: '我晕了，信息量太大', sub: '脑壳嗡嗡作响', cat: '吃瓜' },
  { mood: 'think', text: '让我想想…', sub: '陷入沉思的哲学家奶娃', cat: '日常' },
  { mood: 'happy', text: '下班！冲冲冲！', sub: '快乐是打工人的燃料', cat: '日常' },
  { mood: 'love', text: '电子布洛芬，已送达', sub: '治愈你的一整天', cat: '打气' },
  { mood: 'cool', text: '这波我在 Atmospheric 层', sub: '淡定到离谱', cat: '酷拽' },
  { mood: 'shocked', text: '退退退！', sub: '拒绝一切烦恼靠近', cat: '发疯' },
  { mood: 'sleepy', text: '已读，晚点回（ colony ）', sub: '佛系回复大师', cat: '摆烂' }
]
const cats = ['全部', '打气', '酷拽', '种草', '吃瓜', '摆烂', '发疯', '日常']
const cat = ref('全部')
const shown = computed(() => cat.value === '全部' ? memes : memes.filter(m => m.cat === cat.value))
const featured = ref(memes[0])
const toast = ref('')

const shuffle = () => {
  const pool = shown.value
  featured.value = pool[Math.floor(Math.random() * pool.length)]
  const idx = memes.indexOf(featured.value)
  const card = document.querySelectorAll('.meme-card')[idx]
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
const copy = text => {
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
  toast.value = text
  setTimeout(() => { toast.value = '' }, 1800)
}
</script>

<style scoped>
.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 10px; font-size: 13px; font-weight: 600; background: linear-gradient(90deg, #f7b733, #e8931c); border: none; color: #fff; }
.hero { position: relative; overflow: hidden; background: linear-gradient(120deg, #f7b733, #e8931c); border-radius: var(--r-lg); padding: 30px 38px; display: flex; align-items: center; gap: 30px; color: #fff; margin-bottom: 20px; box-shadow: 0 14px 34px rgba(232,147,28,.28); }
.hero-mascot { position: relative; flex-shrink: 0; }
.hero-mascot :deep(.mascot) { background: rgba(255,255,255,.2); border-radius: 50%; position: relative; z-index: 2; animation: floaty 4s ease-in-out infinite; }
.ring { position: absolute; inset: -14px; border: 2px dashed rgba(255,255,255,.35); border-radius: 50%; animation: spin 18s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.hero-copy { flex: 1; }
.hero-copy .tag { font-size: 11px; background: rgba(255,255,255,.22); padding: 4px 11px; border-radius: 20px; }
.hero-copy h2 { font-size: 28px; margin: 12px 0 6px; font-weight: 800; }
.hero-copy p { font-size: 13px; opacity: .9; }
.hero-copy button { margin-top: 16px; display: inline-flex; align-items: center; gap: 7px; background: #fff; color: #d07f10; border: none; padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; }
.bubbles { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
.bubbles span { background: rgba(255,255,255,.2); border: 1px solid rgba(255,255,255,.4); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.bubbles span:nth-child(1) { transform: translateX(-10px); } .bubbles span:nth-child(3) { transform: translateX(-24px); }
.filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.filter-row button { border: 1px solid var(--line); background: var(--card); padding: 7px 15px; border-radius: 20px; font-size: 12.5px; color: var(--muted); }
.filter-row button.active { background: var(--ink); color: var(--card); border-color: var(--ink); }
.meme-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.meme-card { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; cursor: pointer; transition: .22s; animation: rise .45s both; }
.meme-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.meme-face { height: 160px; display: grid; place-items: center; }
.meme-face :deep(.mascot) { transition: transform .3s; }
.meme-card:hover .meme-face :deep(.mascot) { transform: scale(1.12) rotate(-5deg); }
.bg-0 { background: linear-gradient(135deg, #fff3d9, #ffe4a3); } .bg-1 { background: linear-gradient(135deg, #e8f0ff, #cfdeff); } .bg-2 { background: linear-gradient(135deg, #ffe9ec, #ffd0d6); } .bg-3 { background: linear-gradient(135deg, #dcf7ec, #bcefd8); } .bg-4 { background: linear-gradient(135deg, #f0e7ff, #ddccff); }
.meme-text { padding: 14px 16px 8px; font-size: 13.5px; font-weight: 600; text-align: center; min-height: 54px; line-height: 1.5; }
.meme-foot { display: flex; justify-content: space-between; align-items: center; padding: 8px 16px 14px; color: var(--muted); font-size: 11px; }
.meme-foot span { background: var(--bg-soft); padding: 2px 9px; border-radius: 6px; }
.toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: var(--ink); color: var(--card); padding: 12px 22px; border-radius: 12px; font-size: 13px; display: flex; align-items: center; gap: 8px; box-shadow: var(--shadow-md); z-index: 200; white-space: nowrap; }
@media (max-width: 1100px) { .meme-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .meme-grid { grid-template-columns: repeat(2, 1fr); } .bubbles { display: none; } .hero { padding: 24px; } }
</style>
