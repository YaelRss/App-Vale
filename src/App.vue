<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100">
    <!-- Barra Superior -->
    <header class="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-indigo-500/30">
            📊
          </span>
          <div>
            <h1 class="text-sm font-black tracking-wide">ContaMaster</h1>
            <p class="text-[10px] text-slate-400">Guía & Simulador NIF</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span 
            :class="store.isOnline ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'"
            class="text-[10px] px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="store.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'"></span>
            {{ store.isOnline ? 'En línea' : 'Modo Offline' }}
          </span>
        </div>
      </div>
    </header>

    <!-- Pestañas de Navegación -->
    <nav class="bg-slate-900 border-b border-slate-800">
      <div class="max-w-6xl mx-auto flex gap-1 p-2 overflow-x-auto text-xs font-bold">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="[
            'px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-2',
            currentTab === tab.id 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          ]"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.name }}
        </button>
      </div>
    </nav>

    <!-- Contenido Dinámico -->
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

    <!-- Modal CRUD -->
    <ItemModal 
      :is-open="isModalOpen" 
      :item-data="editingItem" 
      @close="isModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountingStore } from './stores/useAccountingStore'
import MachoteViewer from './components/MachoteViewer.vue'
import ConceptosViewer from './components/ConceptosViewer.vue'
import BalanceSimulator from './components/BalanceSimulator.vue'
import GameCenter from './components/GameCenter.vue'
import ItemModal from './components/ItemModal.vue'

const store = useAccountingStore()
const currentTab = ref('machote')
const isModalOpen = ref(false)
const editingItem = ref(null)

const tabs = [
  { id: 'machote', name: 'Machote & Cuentas', icon: '📑' },
  { id: 'teoria', name: 'Reglas & T de Mayor', icon: '📚' },
  { id: 'simulador', name: 'Simulador Balance', icon: '🧮' },
  { id: 'juegos', name: 'Modo Quiz & Retos', icon: '🎮' }
]

function openModal(item = null) {
  editingItem.value = item
  isModalOpen.value = true
}

onMounted(() => {
  store.fetchAll()
})
</script>
