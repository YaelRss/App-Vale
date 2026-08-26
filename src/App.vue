<template>
  <div class="min-h-screen flex flex-col bg-rose-50/40 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
    <!-- Pantalla Inicial de Carga (Splash Screen) -->
    <SplashScreen :trigger-key="splashKey" />

    <!-- Header Superior Minimalista y Elegante -->
    <header class="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-rose-100/80 dark:border-slate-800 px-4 sm:px-6 py-3 shadow-xs">
      <div class="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <!-- Logo / Marca Conta App & Calculadora Kawaii Tierna -->
        <div @click="goToHome" class="flex items-center gap-3 cursor-pointer group">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25 shrink-0 overflow-hidden p-1 group-hover:scale-105 transition duration-150">
            <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 leading-none">Conta App</h1>
              <span class="text-[10px] px-2 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold rounded-md uppercase">Valeria</span>
            </div>
            <p class="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">Plataforma NIF</p>
          </div>
        </div>

        <!-- Acciones Rápidas y Botón de Menú Desplegable -->
        <div class="flex items-center gap-2">
          <!-- Toggle Tema Claro / Oscuro -->
          <button 
            @click="toggleTheme" 
            title="Cambiar Tema"
            class="p-2.5 bg-rose-100/60 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-amber-400 rounded-2xl transition active:scale-95 flex items-center justify-center shrink-0"
          >
            <!-- Sol para modo claro -->
            <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <!-- Luna para modo oscuro -->
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Botón de Menú Desplegable Hamburguesa -->
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            title="Abrir Menú"
            class="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl transition active:scale-95 flex items-center justify-center shadow-md shadow-rose-500/20"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Menú Desplegable Lateral (Drawer Menu) -->
    <div v-if="isMenuOpen" class="fixed inset-0 z-50 bg-slate-950/70 animate-pop-in flex justify-end">
      <div class="w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 border-l border-rose-100 dark:border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl text-slate-800 dark:text-slate-100 overflow-y-auto">
        <div class="space-y-6">
          <!-- Encabezado del Menú -->
          <div class="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-2xl bg-rose-500 text-white p-1 flex items-center justify-center shadow-md">
                <img src="/favicon.svg" alt="Conta App" class="w-full h-full object-contain" />
              </div>
              <div>
                <h3 class="text-base font-black text-slate-900 dark:text-white">Conta App</h3>
                <p class="text-xs text-slate-400 font-medium">Navegación de Módulos</p>
              </div>
            </div>
            <button @click="isMenuOpen = false" class="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition active:scale-95">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Opciones de Navegación del Menú -->
          <div class="space-y-2">
            <p class="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1">Secciones Disponibles</p>
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="switchTab(tab.id)"
              :class="[
                'w-full p-3.5 rounded-2xl transition-all duration-150 flex items-center justify-between text-xs font-bold text-left touch-manipulation active:scale-95',
                currentTab === tab.id 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25' 
                  : tab.id === 'juegos'
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 font-extrabold border border-rose-200 dark:border-rose-800/60'
                    : 'bg-rose-50/40 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-rose-100/60 dark:hover:bg-slate-800'
              ]"
            >
              <div class="flex items-center gap-3">
                <svg v-if="tab.id === 'inicio'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <svg v-else-if="tab.id === 'juegos'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
                <svg v-else-if="tab.id === 'machote'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
                <svg v-else-if="tab.id === 'teoria'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                <svg v-else-if="tab.id === 'simulador'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>
                <span>{{ tab.name }}</span>
              </div>
              <span v-if="tab.id === 'juegos'" class="text-[9px] px-2 py-0.5 bg-rose-500 text-white rounded-md uppercase font-black">Principal</span>
            </button>
          </div>
        </div>

        <!-- Pie del Menú Desplegable con Estado de Usuario -->
        <div class="pt-6 border-t border-rose-100 dark:border-slate-800 space-y-4">
          <!-- Indicador de Red -->
          <div class="flex items-center justify-between p-3 bg-rose-50/50 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <span class="text-slate-500 dark:text-slate-400">Estado de Red:</span>
            <span 
              :class="store.isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
              class="flex items-center gap-1.5"
            >
              <span class="w-2 h-2 rounded-full" :class="store.isOnline ? 'bg-emerald-500' : 'bg-amber-500'"></span>
              {{ store.isOnline ? 'En línea' : 'Modo Offline' }}
            </span>
          </div>

          <!-- Usuario / Auth Status -->
          <div v-if="authStore.user" class="p-3.5 bg-rose-100/50 dark:bg-slate-800 rounded-2xl flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5 truncate">
              <div class="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {{ (authStore.user.user_metadata?.display_name || authStore.user.email || 'V')[0].toUpperCase() }}
              </div>
              <div class="truncate">
                <p class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {{ authStore.user.user_metadata?.display_name || authStore.user.email?.split('@')[0] }}
                </p>
                <p class="text-[10px] text-slate-400 truncate">Sesión activa</p>
              </div>
            </div>
            <button @click="authStore.logout(); isMenuOpen = false" class="p-2 text-rose-500 hover:bg-rose-200/50 rounded-xl transition">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>

          <button 
            v-else 
            @click="promptLogin(''); isMenuOpen = false"
            class="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-rose-500/20"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            <span>Iniciar Sesión para Editar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navegación por Pestañas Adaptable con Inicio y Retos Destacados -->
    <nav class="bg-white dark:bg-slate-900 border-b border-rose-100/80 dark:border-slate-800 sticky top-[61px] sm:top-[65px] z-30 shadow-xs">
      <div class="max-w-6xl mx-auto flex gap-2 p-2 sm:p-2.5 overflow-x-auto no-scrollbar text-xs font-bold">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            'px-4 py-2.5 rounded-2xl transition-all duration-150 whitespace-nowrap flex items-center gap-2 shrink-0 touch-manipulation active:scale-95 text-xs sm:text-sm',
            currentTab === tab.id 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 font-bold' 
              : tab.id === 'juegos'
                ? 'text-rose-600 dark:text-rose-400 font-extrabold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-rose-50/60 dark:hover:bg-slate-800'
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
    <main class="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full animate-slide-up">
      <HomeDashboard 
        v-if="currentTab === 'inicio'" 
        @select-tab="switchTab" 
      />
      <GameCenter 
        v-else-if="currentTab === 'juegos'" 
      />
      <MachoteViewer 
        v-else-if="currentTab === 'machote'" 
        @open-create="openModal(null)" 
        @edit-item="openModal" 
        @require-auth="promptLogin"
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
      :notice-message="loginNotice"
      @close="isLoginOpen = false; loginNotice = ''" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountingStore } from './stores/useAccountingStore'
import { useAuthStore } from './stores/useAuthStore'
import SplashScreen from './components/SplashScreen.vue'
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
const splashKey = ref(1)
const isModalOpen = ref(false)
const isLoginOpen = ref(false)
const isMenuOpen = ref(false)
const loginNotice = ref('')
const editingItem = ref(null)
const isDark = ref(localStorage.getItem('conta_theme') === 'dark')

const tabs = [
  { id: 'inicio', name: 'Inicio' },
  { id: 'juegos', name: 'Centro de Retos' },
  { id: 'machote', name: 'Machote & Cuentas' },
  { id: 'teoria', name: 'Reglas & T de Mayor' },
  { id: 'simulador', name: 'Simulador Balance' }
]

function goToHome() {
  currentTab.value = 'inicio'
  splashKey.value++
}

function switchTab(tabId) {
  currentTab.value = tabId
  isMenuOpen.value = false
}

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

function promptLogin(msg = '') {
  loginNotice.value = msg || 'Debes iniciar sesión para realizar modificaciones en el catálogo.'
  isLoginOpen.value = true
}

function openModal(item = null) {
  if (!authStore.user) {
    promptLogin('Debes iniciar sesión o ingresar como invitada para agregar o modificar cuentas.')
    return
  }
  editingItem.value = item
  isModalOpen.value = true
}

onMounted(() => {
  applyTheme()
  authStore.initAuth()
  store.fetchAll()
})
</script>
