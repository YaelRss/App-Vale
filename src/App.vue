<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100">
    <!-- Header Superior -->
    <header class="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <!-- Logo / Marca -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <div>
            <h1 class="text-sm font-black tracking-wide text-slate-100">ContaMaster</h1>
            <p class="text-[10px] text-slate-400 font-medium">Plataforma NIF</p>
          </div>
        </div>

        <!-- Indicador de Red y Usuario -->
        <div class="flex items-center gap-2.5">
          <!-- Badge Online / Offline -->
          <span 
            :class="store.isOnline ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80' : 'bg-amber-950/60 text-amber-400 border-amber-800/80'"
            class="text-[10px] px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5"
          >
            <svg v-if="store.isOnline" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            <svg v-else class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            <span>{{ store.isOnline ? 'En línea' : 'Modo Offline' }}</span>
          </span>

          <!-- Usuario / Auth Button -->
          <button 
            v-if="!authStore.user" 
            @click="isLoginOpen = true"
            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            <span>Iniciar Sesión</span>
          </button>

          <div v-else class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-300 hidden sm:inline">
              {{ authStore.user.user_metadata?.display_name || authStore.user.email?.split('@')[0] }}
            </span>
            <button 
              @click="authStore.logout" 
              title="Cerrar Sesión" 
              class="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navegación por Pestañas -->
    <nav class="bg-slate-900 border-b border-slate-800">
      <div class="max-w-6xl mx-auto flex gap-1 p-2 overflow-x-auto text-xs font-bold">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="[
            'px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2',
            currentTab === tab.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          ]"
        >
          <!-- SVGs Específicos para cada pestaña -->
          <svg v-if="tab.id === 'machote'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
          <svg v-else-if="tab.id === 'teoria'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
          <svg v-else-if="tab.id === 'simulador'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>
          <svg v-else-if="tab.id === 'juegos'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </nav>

    <!-- Vista Principal -->
    <main class="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <MachoteViewer 
        v-if="currentTab === 'machote'" 
        @open-create="openModal(null)" 
        @edit-item="openModal" 
      />
      <ConceptosViewer v-else-if="currentTab === 'teoria'" />
      <BalanceSimulator v-else-if="currentTab === 'simulador'" />
      <GameCenter v-else-if="currentTab === 'juegos'" />
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
import MachoteViewer from './components/MachoteViewer.vue'
import ConceptosViewer from './components/ConceptosViewer.vue'
import BalanceSimulator from './components/BalanceSimulator.vue'
import GameCenter from './components/GameCenter.vue'
import ItemModal from './components/ItemModal.vue'
import LoginModal from './components/LoginModal.vue'

const store = useAccountingStore()
const authStore = useAuthStore()

const currentTab = ref('machote')
const isModalOpen = ref(false)
const isLoginOpen = ref(false)
const editingItem = ref(null)

const tabs = [
  { id: 'machote', name: 'Machote & Cuentas' },
  { id: 'teoria', name: 'Reglas & T de Mayor' },
  { id: 'simulador', name: 'Simulador Balance' },
  { id: 'juegos', name: 'Centro de Retos' }
]

function openModal(item = null) {
  editingItem.value = item
  isModalOpen.value = true
}

onMounted(() => {
  authStore.initAuth()
  store.fetchAll()
})
</script>
