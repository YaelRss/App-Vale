<template>
  <div class="max-w-xl mx-auto space-y-4 sm:space-y-5 pb-12">
    <!-- Selector de Modos de Juego Adaptable -->
    <div class="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 p-1.5 rounded-2xl text-xs font-bold text-slate-500 dark:text-slate-400 shadow-xs">
      <button 
        v-for="mode in modes" 
        :key="mode.id"
        @click="currentMode = mode.id; resetGame()"
        :class="currentMode === mode.id ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold' : 'hover:text-rose-600 dark:hover:text-slate-200'"
        class="py-2.5 rounded-xl transition-all duration-150 text-center flex items-center justify-center gap-1 touch-manipulation px-1 active:scale-95"
      >
        <span class="truncate">{{ mode.name }}</span>
      </button>
    </div>

    <!-- Marcador y Vidas -->
    <div class="flex items-center justify-between px-4 sm:px-5 py-3 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl shadow-xs text-xs font-bold">
      <div class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs">
        <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
        <span>Racha: {{ streak }} (Máx: {{ maxStreak }})</span>
      </div>

      <div class="flex items-center gap-1">
        <svg 
          v-for="i in 3" 
          :key="i"
          class="w-4 h-4 shrink-0 transition-transform duration-150"
          :class="i <= lives ? 'text-rose-500 fill-rose-500 scale-105' : 'text-slate-300 dark:text-slate-700'"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      </div>
    </div>

    <!-- Carta de Juego Activa Adaptable y Animada sin difuminados -->
    <div v-if="activeCard" class="p-5 sm:p-8 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-xs text-center space-y-5 sm:space-y-6 animate-pop-in">
      <div class="text-[10px] uppercase font-mono tracking-widest text-rose-500 font-bold">
        {{ getPromptText() }}
      </div>

      <div class="space-y-1">
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">{{ activeCard.displayTitle }}</h3>
        <p v-if="activeCard.subtitle" class="text-xs font-mono text-slate-500 dark:text-slate-400 leading-relaxed">{{ activeCard.subtitle }}</p>
      </div>

      <!-- Opciones Adaptables y Animadas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
        <button 
          v-for="opt in currentOptions" 
          :key="opt.value"
          @click="submitAnswer(opt.value)"
          class="p-3 sm:p-3.5 bg-rose-50/40 dark:bg-slate-950 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white active:scale-95 border border-rose-100 dark:border-slate-800 hover:border-rose-500 rounded-2xl text-xs font-bold transition-all duration-150 text-slate-700 dark:text-slate-200 shadow-xs flex items-center justify-center text-center min-h-[44px] touch-manipulation"
        >
          <span>{{ opt.label }}</span>
        </button>
      </div>

      <!-- Retroalimentación con SVGs -->
      <div 
        v-if="feedback" 
        :class="feedback.correct ? 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800' : 'text-rose-800 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-950/60 dark:border-rose-800'"
        class="p-3 sm:p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 leading-relaxed animate-slide-up"
      >
        <svg v-if="feedback.correct" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        <svg v-else class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>{{ feedback.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'

const store = useAccountingStore()
const currentMode = ref('clasificacion')
const streak = ref(0)
const maxStreak = ref(0)
const lives = ref(3)
const activeCard = ref(null)
const feedback = ref(null)

const modes = [
  { id: 'clasificacion', name: 'Clasificación' },
  { id: 'naturaleza', name: 'Naturaleza' },
  { id: 'eureka', name: 'Siglas Eureka' }
]

function getPromptText() {
  if (currentMode.value === 'clasificacion') return '¿A qué estado o rubro pertenece?'
  if (currentMode.value === 'naturaleza') return '¿Cuál es su naturaleza contable normal?'
  return '¿A qué cuenta corresponde este código/sigla?'
}

const currentOptions = computed(() => {
  if (currentMode.value === 'clasificacion') {
    return [
      { label: 'Activo Circulante', value: 'Activo Circulante' },
      { label: 'Activo No Circulante', value: 'Activo No Circulante' },
      { label: 'Pasivo Corto Plazo', value: 'Pasivo Corto Plazo' },
      { label: 'Pasivo Largo Plazo', value: 'Pasivo Largo Plazo' },
      { label: 'Capital Contable', value: 'Capital Contable' },
      { label: 'Estado de Resultados (ERI)', value: 'ERI' }
    ]
  } else if (currentMode.value === 'naturaleza') {
    return [
      { label: 'Deudora (Aumenta Cargando)', value: 'Deudora' },
      { label: 'Acreedora (Aumenta Abonando)', value: 'Acreedora' }
    ]
  } else {
    return activeCard.value?.choices || []
  }
})

function nextCard() {
  feedback.value = null
  const allItems = []
  store.documents.forEach(doc => {
    doc.sections?.forEach(sec => {
      sec.financial_items?.forEach(item => {
        if (!item.is_group_total) {
          allItems.push({ ...item, sectionName: sec.name, docCode: doc.short_code })
        }
      })
    })
  })

  if (!allItems.length) return

  if (currentMode.value === 'clasificacion') {
    const item = allItems[Math.floor(Math.random() * allItems.length)]
    activeCard.value = {
      displayTitle: item.name,
      subtitle: item.abbreviation ? `Sigla: ${item.abbreviation}` : null,
      correct: item.docCode === 'ERI' ? 'ERI' : item.sectionName
    }
  } else if (currentMode.value === 'naturaleza') {
    const item = allItems[Math.floor(Math.random() * allItems.length)]
    activeCard.value = {
      displayTitle: item.name,
      subtitle: `Sección: ${item.sectionName}`,
      correct: item.normal_balance
    }
  } else {
    const eurekaList = allItems.filter(i => i.abbreviation || i.code)
    const target = eurekaList[Math.floor(Math.random() * eurekaList.length)]
    const others = eurekaList.filter(i => i.id !== target.id).sort(() => 0.5 - Math.random()).slice(0, 3)
    const choices = [target, ...others].sort(() => 0.5 - Math.random()).map(c => ({
      label: c.name,
      value: c.name
    }))
    activeCard.value = {
      displayTitle: target.abbreviation || target.code,
      subtitle: `Código: ${target.code || 'N/A'}`,
      correct: target.name,
      choices
    }
  }
}

function submitAnswer(val) {
  if (!activeCard.value) return
  const isMatch = activeCard.value.correct.includes(val) || val.includes(activeCard.value.correct)

  if (isMatch) {
    streak.value++
    if (streak.value > maxStreak.value) maxStreak.value = streak.value
    feedback.value = { correct: true, message: 'Respuesta correcta' }
  } else {
    lives.value--
    streak.value = 0
    feedback.value = { correct: false, message: `Incorrecto. Correcta: ${activeCard.value.correct}` }
    if (lives.value <= 0) lives.value = 3
  }

  setTimeout(nextCard, 1100)
}

function resetGame() {
  streak.value = 0
  lives.value = 3
  nextCard()
}

onMounted(() => {
  store.fetchAll().then(nextCard)
})
</script>
