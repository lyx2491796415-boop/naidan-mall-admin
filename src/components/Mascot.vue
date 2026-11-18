<template>
  <svg class="mascot" :width="size" :height="size" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="faceG" cx="42%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#fff9e8" />
        <stop offset="60%" stop-color="#ffe6a3" />
        <stop offset="100%" stop-color="#f6c65f" />
      </radialGradient>
      <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f8cd6d" />
        <stop offset="100%" stop-color="#eb9f27" />
      </linearGradient>
    </defs>

    <g class="floaty" :style="{ transformOrigin: '100px 100px' }">
      <!-- 身体 -->
      <path d="M62 168 Q60 138 100 136 Q140 138 138 168 Z" fill="url(#bodyG)" />
      <!-- 耳朵 -->
      <circle cx="44" cy="92" r="17" fill="url(#faceG)" stroke="#e9b447" stroke-width="2" />
      <circle cx="156" cy="92" r="17" fill="url(#faceG)" stroke="#e9b447" stroke-width="2" />
      <!-- 脸 -->
      <circle cx="100" cy="92" r="60" fill="url(#faceG)" stroke="#e9b447" stroke-width="2.5" />
      <!-- 呆毛 -->
      <path d="M96 33 Q92 16 104 12 Q100 24 110 30" fill="none" stroke="#e9b447" stroke-width="5" stroke-linecap="round" />

      <!-- 腮红 -->
      <ellipse cx="66" cy="104" rx="11" ry="6.5" fill="#ff8f7a" opacity=".38" />
      <ellipse cx="134" cy="104" rx="11" ry="6.5" fill="#ff8f7a" opacity=".38" />

      <!-- 眼睛 -->
      <g v-if="mood === 'happy' || mood === 'smug'">
        <path d="M70 86 Q80 74 90 86" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <path d="M110 86 Q120 74 130 86" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
      </g>
      <g v-else-if="mood === 'love'">
        <path d="M80 78 C74 70 62 74 66 84 Q70 92 80 98 Q90 92 94 84 C98 74 86 70 80 78 Z" fill="#e5484d" />
        <path d="M120 78 C114 70 102 74 106 84 Q110 92 120 98 Q130 92 134 84 C138 74 126 70 120 78 Z" fill="#e5484d" />
      </g>
      <g v-else-if="mood === 'cool'">
        <rect x="62" y="78" width="35" height="24" rx="9" fill="#20242e" />
        <rect x="103" y="78" width="35" height="24" rx="9" fill="#20242e" />
        <path d="M97 86 Q100 82 103 86" fill="none" stroke="#20242e" stroke-width="4" />
        <path d="M66 82 L78 88" stroke="#fff" stroke-width="2.5" opacity=".7" stroke-linecap="round" />
      </g>
      <g v-else-if="mood === 'shocked'">
        <circle cx="80" cy="86" r="13" fill="#fff" stroke="#4a3208" stroke-width="3" />
        <circle cx="120" cy="86" r="13" fill="#fff" stroke="#4a3208" stroke-width="3" />
        <circle cx="80" cy="86" r="4.5" fill="#4a3208" />
        <circle cx="120" cy="86" r="4.5" fill="#4a3208" />
      </g>
      <g v-else-if="mood === 'wink'">
        <path d="M70 86 Q80 74 90 86" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <ellipse cx="120" cy="86" rx="6" ry="9" fill="#4a3208" />
      </g>
      <g v-else-if="mood === 'sleepy'">
        <path d="M70 88 Q80 94 90 88" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <path d="M110 88 Q120 94 130 88" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
      </g>
      <g v-else-if="mood === 'angry'">
        <path d="M68 72 L90 80" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <path d="M132 72 L110 80" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <ellipse cx="80" cy="90" rx="6" ry="8" fill="#4a3208" />
        <ellipse cx="120" cy="90" rx="6" ry="8" fill="#4a3208" />
      </g>
      <g v-else-if="mood === 'cry'">
        <path d="M70 84 Q80 76 90 84" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <path d="M110 84 Q120 76 130 84" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
        <path d="M78 90 Q78 108 72 118 Q66 108 66 90 Z" fill="#7cc4f5" opacity=".9" />
        <path d="M122 90 Q122 108 116 118 Q110 108 110 90 Z" fill="#7cc4f5" opacity=".9" />
      </g>
      <g v-else-if="mood === 'dizzy'">
        <path d="M70 80 q10 -8 18 2 q-9 10 -2 18 q-12 4 -14 -8 q-2 -8 -2 -12" fill="none" stroke="#4a3208" stroke-width="3" stroke-linecap="round" />
        <path d="M130 80 q-10 -8 -18 2 q9 10 2 18 q12 4 14 -8 q2 -8 2 -12" fill="none" stroke="#4a3208" stroke-width="3" stroke-linecap="round" />
      </g>
      <g v-else-if="mood === 'think'">
        <circle cx="80" cy="84" r="8" fill="#fff" stroke="#4a3208" stroke-width="3" />
        <circle cx="83" cy="84" r="4" fill="#4a3208" />
        <path d="M108 88 Q120 76 132 88" fill="none" stroke="#4a3208" stroke-width="5" stroke-linecap="round" />
      </g>
      <g v-else>
        <ellipse cx="80" cy="86" rx="6.5" ry="9" fill="#4a3208" />
        <ellipse cx="120" cy="86" rx="6.5" ry="9" fill="#4a3208" />
        <circle cx="82" cy="83" r="2" fill="#fff" />
        <circle cx="122" cy="83" r="2" fill="#fff" />
      </g>

      <!-- 嘴巴 -->
      <g v-if="mood === 'happy' || mood === 'love' || mood === 'wink'">
        <path d="M84 112 Q100 134 116 112 Z" fill="#7a3410" stroke="#5a2408" stroke-width="2" />
        <path d="M92 123 Q100 117 108 123 Q100 130 92 123 Z" fill="#ff7d8a" />
      </g>
      <path v-else-if="mood === 'smug'" d="M86 116 Q100 126 114 112" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else-if="mood === 'cool'" d="M88 116 Q100 124 112 116" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <g v-else-if="mood === 'shocked'">
        <ellipse cx="100" cy="118" rx="9" ry="11" fill="#7a3410" />
      </g>
      <path v-else-if="mood === 'sleepy'" d="M92 118 Q100 122 108 118" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else-if="mood === 'angry'" d="M88 124 Q100 112 112 124" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else-if="mood === 'cry'" d="M86 122 Q100 110 114 122" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else-if="mood === 'dizzy'" d="M86 118 q7 -6 14 0 q7 6 14 0" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else-if="mood === 'think'" d="M90 118 q10 4 18 -2" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />
      <path v-else d="M88 116 Q100 126 112 116" fill="none" stroke="#7a3410" stroke-width="4" stroke-linecap="round" />

      <!-- 困倦 ZZZ -->
      <g v-if="mood === 'sleepy'" fill="#eda62a" font-weight="800" font-family="sans-serif">
        <text x="150" y="62" font-size="18">z</text>
        <text x="162" y="48" font-size="14">z</text>
        <text x="172" y="38" font-size="11">z</text>
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  mood: { type: String, default: 'happy' },
  size: { type: [Number, String], default: 120 }
})
</script>

<style scoped>
.mascot { display: block; }
.floaty { animation: floaty 4s ease-in-out infinite; }
</style>
