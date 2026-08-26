<template>
  <div class="space-y-6 max-w-2xl mx-auto pb-16 animate-slide-up font-sans">
    <!-- ENCABEZADO ARCADE INDEPENDIENTE (CENTRO DE RETOS NIF) -->
    <div class="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      <!-- Fondo con brillo decorativo -->
      <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl"></div>
      
      <div class="relative z-10 space-y-4">
        <!-- Barra Superior: Nivel y Puntuación Máxima -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black">
              <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-black tracking-tight leading-none">Arena NIF</h2>
              <span class="text-[10px] text-rose-100 font-bold uppercase tracking-widest">Modo Arcade</span>
            </div>
          </div>

          <!-- Puntuación Máxima -->
          <div class="px-3 py-1.5 bg-white/20 backdrop-blur-xs rounded-2xl text-xs font-bold flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-300 fill-amber-300" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Racha Máx: {{ highScore }}</span>
          </div>
        </div>

        <!-- SELECTOR DE TRES NIVELES DE DIFICULTAD -->
        <div class="pt-2">
          <label class="block text-[11px] font-black uppercase tracking-wider text-rose-100 mb-1.5">Dificultad del Reto:</label>
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="diff in difficulties" 
              :key="diff.id"
              @click="setDifficulty(diff.id)"
              :class="[
                'py-2 px-2.5 rounded-2xl text-xs font-extrabold transition-all duration-150 flex flex-col items-center justify-center gap-0.5 touch-manipulation active:scale-95 border',
                currentDifficulty === diff.id 
                  ? 'bg-white text-rose-600 border-white shadow-md font-black' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              ]"
            >
              <div class="flex items-center gap-1">
                <span>{{ diff.icon }}</span>
                <span>{{ diff.name }}</span>
              </div>
              <span class="text-[9px] opacity-80 font-normal">{{ diff.badge }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SELECTOR DE MODOS DE JUEGO -->
    <div class="grid grid-cols-3 gap-1.5 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 p-2 rounded-2xl text-xs font-bold shadow-xs">
      <button 
        v-for="mode in modes" 
        :key="mode.id"
        @click="currentMode = mode.id; resetGame()"
        :class="currentMode === mode.id ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black' : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-slate-200'"
        class="py-2.5 rounded-xl transition-all duration-150 text-center flex items-center justify-center gap-1.5 touch-manipulation active:scale-95"
      >
        <span>{{ mode.name }}</span>
      </button>
    </div>

    <!-- MARCADOR EN VIVO: VIDAS, PUNTOS Y TEMPORIZADOR -->
    <div class="flex items-center justify-between px-5 py-3.5 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl shadow-xs text-xs font-bold">
      <!-- Puntos y Racha -->
      <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black">
        <svg class="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
        <span>Racha Actual: {{ streak }}</span>
        <span class="text-[10px] px-1.5 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-md font-bold">x{{ multiplier }}</span>
      </div>

      <!-- Vidas (Corazones) -->
      <div class="flex items-center gap-1">
        <svg 
          v-for="i in maxLives" 
          :key="i"
          class="w-5 h-5 shrink-0 transition-transform duration-150"
          :class="i <= lives ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-300 dark:text-slate-700'"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      </div>
    </div>

    <!-- BARRA DE TIEMPO (Si aplica en la dificultad) -->
    <div v-if="timeLimit > 0" class="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
      <div 
        class="h-full transition-all duration-1000 ease-linear rounded-full"
        :class="timeLeft <= 3 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'"
        :style="{ width: `${(timeLeft / timeLimit) * 100}%` }"
      ></div>
    </div>

    <!-- TARJETA DEL JUEGO CON ANIMACIONES Y SHAKE -->
    <div 
      v-if="activeCard && !isGameOver" 
      :class="[
        'p-6 sm:p-8 bg-white dark:bg-slate-900 border-2 rounded-3xl shadow-sm text-center space-y-6 transition-all duration-200',
        isShaking ? 'animate-bounce border-rose-500' : 'border-rose-100 dark:border-slate-800'
      ]"
    >
      <!-- Pregunta Guía -->
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-800/60 rounded-full text-[11px] font-bold text-rose-600 dark:text-rose-300">
        <span>{{ getPromptText() }}</span>
      </div>

      <!-- Título de la Cuenta / Pregunta -->
      <div class="space-y-1 py-2">
        <h3 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{{ activeCard.displayTitle }}</h3>
        <p v-if="activeCard.subtitle" class="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">{{ activeCard.subtitle }}</p>
      </div>

      <!-- OPCIONES DE RESPUESTA EN REJILLA ESPACIOSA -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button 
          v-for="opt in currentOptions" 
          :key="opt.value"
          @click="submitAnswer(opt.value)"
          class="p-4 bg-rose-50/50 dark:bg-slate-950 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white active:scale-95 border border-rose-100 dark:border-slate-800 hover:border-rose-500 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 text-slate-800 dark:text-slate-200 shadow-xs flex items-center justify-center text-center min-h-[52px] touch-manipulation"
        >
          <span>{{ opt.label }}</span>
        </button>
      </div>

      <!-- RETROALIMENTACIÓN ANIMADA CON ICONO -->
      <div 
        v-if="feedback" 
        :class="feedback.correct ? 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/70 dark:border-emerald-800' : 'text-rose-800 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-950/70 dark:border-rose-800'"
        class="p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 leading-relaxed animate-slide-up shadow-xs"
      >
        <svg v-if="feedback.correct" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        <svg v-else class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>{{ feedback.message }}</span>
      </div>
    </div>

    <!-- MODAL DE GAME OVER / RESUMEN DE PUNTUACIÓN -->
    <div v-if="isGameOver" class="p-6 sm:p-8 bg-white dark:bg-slate-900 border-2 border-rose-400 dark:border-rose-500 rounded-3xl text-center space-y-6 shadow-xl animate-pop-in">
      <div class="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
      </div>

      <div class="space-y-2">
        <h3 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">¡Fin del Juego!</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Excelente intento en el modo {{ getDifficultyName() }}.</p>
      </div>

      <div class="p-4 bg-rose-50/60 dark:bg-slate-800 rounded-2xl space-y-2">
        <div class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Racha Alcanzada</div>
        <div class="text-3xl sm:text-4xl font-black text-rose-600 dark:text-rose-400">{{ streak }} Puntos</div>
        <div class="text-xs text-slate-400 font-medium">Record personal: {{ highScore }} Puntos</div>
      </div>

      <button 
        @click="resetGame()"
        class="w-full py-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
        <span>Volver a Intentar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'
import confetti from 'canvas-confetti'

const store = useAccountingStore()

const currentMode = ref('clasificacion')
const currentDifficulty = ref('facil') // 'facil' | 'medio' | 'dificil'
const streak = ref(0)
const highScore = ref(parseInt(localStorage.getItem('conta_high_score') || '0'))
const lives = ref(5)
const maxLives = ref(5)
const timeLimit = ref(0) // 0 = sin limite
const timeLeft = ref(0)
const timer = ref(null)
const activeCard = ref(null)
const feedback = ref(null)
const isShaking = ref(false)
const isGameOver = ref(false)

const difficulties = [
  { id: 'facil', name: 'Principiante', icon: '🟢', badge: '5 Vidas • Sin Tiempo' },
  { id: 'medio', name: 'Intermedio', icon: '🟡', badge: '3 Vidas • 15s Tiempo' },
  { id: 'dificil', name: 'Experta NIF', icon: '🔴', badge: '2 Vidas • 8s Tiempo' }
]

const modes = [
  { id: 'clasificacion', name: 'Clasificación' },
  { id: 'naturaleza', name: '¿Carga / Abona?' },
  { id: 'eureka', name: 'Siglas Eureka' }
]

const multiplier = computed(() => {
  if (currentDifficulty.value === 'dificil') return 3
  if (currentDifficulty.value === 'medio') return 2
  return 1
})

function setDifficulty(diffId) {
  currentDifficulty.value = diffId
  if (diffId === 'facil') {
    maxLives.value = 5
    timeLimit.value = 0
  } else if (diffId === 'medio') {
    maxLives.value = 3
    timeLimit.value = 15
  } else {
    maxLives.value = 2
    timeLimit.value = 8
  }
  resetGame()
}

function getDifficultyName() {
  return difficulties.find(d => d.id === currentDifficulty.value)?.name || 'Principiante'
}

function getPromptText() {
  if (currentMode.value === 'clasificacion') return '¿A qué estado o rubro NIF pertenece?'
  if (currentMode.value === 'naturaleza') return '¿Cuál es su naturaleza contable normal?'
  return '¿A qué cuenta pertenece esta sigla o código?'
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

function startTimer() {
  stopTimer()
  if (timeLimit.value <= 0) return
  timeLeft.value = timeLimit.value
  timer.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      stopTimer()
      handleTimeout()
    }
  }, 1000)
}

function stopTimer() {
  if (timer.value) clearInterval(timer.value)
}

function handleTimeout() {
  lives.value--
  isShaking.value = true
  feedback.value = { correct: false, message: `¡Tiempo agotado! La respuesta era: ${activeCard.value?.correct}` }
  setTimeout(() => isShaking.value = false, 500)
  
  if (lives.value <= 0) {
    isGameOver.value = true
  } else {
    setTimeout(nextCard, 1400)
  }
}

function nextCard() {
  feedback.value = null
  isShaking.value = false
  
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

  startTimer()
}

function submitAnswer(val) {
  if (!activeCard.value || isGameOver.value) return
  stopTimer()

  const isMatch = activeCard.value.correct.includes(val) || val.includes(activeCard.value.correct)

  if (isMatch) {
    streak.value += 1 * multiplier.value
    if (streak.value > highScore.value) {
      highScore.value = streak.value
      localStorage.setItem('conta_high_score', highScore.value.toString())
    }

    feedback.value = { correct: true, message: '¡Excelente! Respuesta correcta.' }

    // Disparar confeti si logra buena racha
    if (streak.value % 3 === 0) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        })
      } catch (e) {
        // Confetti fallback
      }
    }

    setTimeout(nextCard, 1100)
  } else {
    lives.value--
    isShaking.value = true
    feedback.value = { correct: false, message: `Incorrecto. Correcta: ${activeCard.value.correct}` }
    setTimeout(() => isShaking.value = false, 500)

    if (lives.value <= 0) {
      isGameOver.value = true
    } else {
      setTimeout(nextCard, 1400)
    }
  }
}

function resetGame() {
  stopTimer()
  streak.value = 0
  lives.value = maxLives.value
  isGameOver.value = false
  nextCard()
}

onMounted(() => {
  store.fetchAll().then(() => {
    setDifficulty('facil')
  })
})

onUnmounted(() => {
  stopTimer()
})
</script>
