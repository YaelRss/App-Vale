<template>
  <div class="min-h-screen flex flex-col bg-rose-50/40 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
    <!-- Header Superior Minimalista y Elegante -->
    <header class="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-rose-100/80 dark:border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 shadow-xs">
      <div class="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <!-- Logo / Marca Femenina & Calculadora Kawaii Tierna -->
        <div @click="currentTab = 'inicio'" class="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25 shrink-0 overflow-hidden p-1 group-hover:scale-105 transition duration-150">
            <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-slate-100 leading-none">ContaMaster</h1>
              <span class="text-[9px] px-1.5 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold rounded-md uppercase">Valeria</span>
            </div>
            <p class="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">Plataforma NIF</p>
          </div>
        </div>

        <!-- Indicadores, Modo Oscuro y Usuario -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Toggle Tema Claro / Oscuro -->
          <button 
            @click="toggleTheme" 
            title="Cambiar Tema"
            class="p-2 bg-rose-100/60 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-amber-400 rounded-xl transition active:scale-95 flex items-center justify-center shrink-0"
          >
            <!-- Sol para modo claro -->
            <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <!-- Luna para modo oscuro -->
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Badge Online / Offline -->
          <span 
            :class="store.isOnline ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/80' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/80'"
            class="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1 rounded-full font-bold border flex items-center gap-1 shrink-0"
          >
            <svg v-if="store.isOnline" class="w-3 h-3 text-emerald-500 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            <svg v-else class="w-3 h-3 text-amber-500 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            <span class="hidden xs:inline">{{ store.isOnline ? 'En línea' : 'Modo Offline' }}</span>
          </span>

          <!-- Usuario / Auth Button -->
          <button 
            v-if="!authStore.user" 
            @click="isLoginOpen = true"
            class="px-2.5 sm:px-3 py-1.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-500/20"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            <span class="hidden sm:inline">Iniciar Sesión</span>
            <span class="sm:hidden">Entrar</span>
          </button>

          <div v-else class="flex items-center gap-1.5 sm:gap-2">
            <div class="flex items-center gap-1.5 px-2 py-1 bg-rose-100/50 dark:bg-slate-800 border border-rose-200/60 dark:border-slate-700/60 rounded-xl">
              <div class="w-5 h-5 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-[10px]">
                {{ (authStore.user.user_metadata?.display_name || authStore.user.email || 'V')[0].toUpperCase() }}
              </div>
              <span class="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[80px] sm:max-w-[120px] truncate">
                {{ authStore.user.user_metadata?.display_name || authStore.user.email?.split('@')[0] }}
              </span>
            </div>
            <button 
              @click="authStore.logout" 
              title="Cerrar Sesión" 
              class="p-2 text-slate-400 hover:text-rose-500 active:scale-95 bg-rose-50/80 dark:bg-slate-800 rounded-xl transition"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navegación por Pestañas Adaptable con Inicio y Retos Destacados -->
    <nav class="bg-white dark:bg-slate-900 border-b border-rose-100/80 dark:border-slate-800 sticky top-[53px] sm:top-[57px] z-30 shadow-xs">
      <div class="max-w-6xl mx-auto flex gap-1.5 p-1.5 sm:p-2 overflow-x-auto no-scrollbar text-xs font-bold">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="[
            'px-3.5 py-2 rounded-xl transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 shrink-0 touch-manipulation active:scale-95',
            currentTab === tab.id 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 font-bold' 
              : tab.id === 'juegos'
                ? 'text-rose-600 dark:text-rose-400 font-extrabold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-rose-50/60 dark:hover:bg-slate-800'
          ]"
        >
          <svg v-if="tab.id === 'inicio'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <svg v-else-if="tab.id === 'juegos'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
          <svg v-else-if="tab.id === 'machote'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
          <svg v-else-if="tab.id === 'teoria'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
          <svg v-else-if="tab.id === 'simulador'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </nav>

    <!-- Vista Principal Animada -->
    <main class="flex-1 p-3 sm:p-5 md:p-6 max-w-6xl mx-auto w-full animate-slide-up">
      <HomeDashboard 
        v-if="currentTab === 'inicio'" 
        @select-tab="currentTab = $event" 
      />
      <GameCenter 
        v-else-if="currentTab === 'juegos'" 
      />
      <MachoteViewer 
        v-else-if="currentTab === 'machote'" 
        @open-create="openModal(null)" 
        @edit-item="openModal" 
      />
      <ConceptosViewer 
        v-else-if="currentTab === 'teoria'" 
      />
      <BalanceSimulator 
        v-else-if="currentTab === 'simulador'" 
      />
    </main>

    <!-- Modales -->
    <ItemModal 
      :is-open="isModalOpen" 
      :item-data="editingItem" 
      @close="isModalOpen = false" 
    />
    <LoginModal 
      :is-open="isLoginOpen" 
      @close="isLoginOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountingStore } from './stores/useAccountingStore'
import { useAuthStore } from './stores/useAuthStore'
import HomeDashboard from './components/HomeDashboard.vue'
import GameCenter from './components/GameCenter.vue'
import MachoteViewer from './components/MachoteViewer.vue'
import ConceptosViewer from './components/ConceptosViewer.vue'
import BalanceSimulator from './components/BalanceSimulator.vue'
import ItemModal from './components/ItemModal.vue'
import LoginModal from './components/LoginModal.vue'

const store = useAccountingStore()
const authStore = useAuthStore()

const currentTab = ref('inicio')
const isModalOpen = ref(false)
const isLoginOpen = ref(false)
const editingItem = ref(null)
const isDark = ref(localStorage.getItem('conta_theme') === 'dark')

const tabs = [
  { id: 'inicio', name: 'Inicio' },
  { id: 'juegos', name: 'Centro de Retos' },
  { id: 'machote', name: 'Machote & Cuentas' },
  { id: 'teoria', name: 'Reglas & T de Mayor' },
  { id: 'simulador', name: 'Simulador Balance' }
]

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('conta_theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
  }
}

function openModal(item = null) {
  editingItem.value = item
  isModalOpen.value = true
}

onMounted(() => {
  applyTheme()
  authStore.initAuth()
  store.fetchAll()
})
</script>
