<template>
  <div class="space-y-4 sm:space-y-6 max-w-6xl mx-auto">
    <!-- Selector de Estados Financieros Adaptable -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="flex gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
        <button 
          v-for="doc in store.documents"
          :key="doc.id"
          @click="selectedDoc = doc"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border whitespace-nowrap shrink-0 touch-manipulation active:scale-95',
            selectedDoc?.id === doc.id 
              ? 'bg-rose-500 border-rose-400 text-white shadow-md shadow-rose-500/20 font-bold' 
              : 'bg-white dark:bg-slate-900 border-rose-100/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-slate-200'
          ]"
        >
          {{ doc.short_code }} • {{ doc.title }}
        </button>
      </div>

      <button 
        @click="handleCreate"
        class="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 shrink-0"
      >
        <svg v-if="authStore.user" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg v-else class="w-3.5 h-3.5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Nueva Cuenta</span>
      </button>
    </div>

    <!-- Buscador Minimalista con Icono SVG -->
    <div class="relative">
      <div class="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <input 
        v-model="search"
        type="text"
        placeholder="Buscar cuenta, clave o sigla (ej. Clientes, RIF, PPEMOI, Acreedores)..."
        class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border border-rose-100/90 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all shadow-xs"
      />
      <button 
        v-if="search" 
        @click="search = ''" 
        class="absolute right-3 top-3 text-slate-400 hover:text-rose-500 p-1 rounded-lg transition"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Contenedor del Machote Minimalista -->
    <div v-if="selectedDoc" class="bg-white dark:bg-slate-900 border border-rose-100/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
      <div class="p-4 sm:p-6 bg-rose-50/50 dark:bg-slate-950/80 border-b border-rose-100/80 dark:border-slate-800 flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-rose-500 font-bold">{{ selectedDoc.nif_reference }}</span>
          <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">{{ selectedDoc.title }}</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{{ selectedDoc.description }}</p>
        </div>
      </div>

      <div class="p-3 sm:p-6 space-y-5 sm:space-y-6">
        <div v-for="section in filteredSections" :key="section.id" class="space-y-3">
          <h3 class="text-xs font-black tracking-wider uppercase text-rose-950 dark:text-slate-400 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full shrink-0" :class="getNatureBadge(section.nature)"></span>
            <span>{{ section.name }}</span>
          </h3>

          <div class="grid gap-2">
            <div 
              v-for="item in section.financial_items" 
              :key="item.id"
              class="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-150 gap-3"
              :class="item.is_group_total ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/40 font-bold' : 'bg-white dark:bg-slate-950/60 border-rose-100/70 dark:border-slate-800/80 hover:border-rose-200 dark:hover:border-slate-700'"
            >
              <div class="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 shrink-0 mt-0.5 sm:mt-0">
                  <span v-if="item.code" class="px-2 py-0.5 bg-rose-100/70 dark:bg-slate-800 text-rose-900 dark:text-slate-300 rounded-md text-[10px] font-mono font-bold">
                    {{ item.code }}
                  </span>
                  <span v-if="item.abbreviation" class="px-2 py-0.5 bg-pink-100 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60 rounded-md text-[10px] font-mono font-bold">
                    {{ item.abbreviation }}
                  </span>
                  <span v-if="item.operation_sign" class="w-5 h-5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-mono font-black">
                    {{ item.operation_sign }}
                  </span>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex flex-wrap items-center gap-2">
                    <span class="truncate">{{ item.name }}</span>
                    <span 
                      class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0"
                      :class="item.normal_balance === 'Deudora' ? 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800/80' : 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800/80'"
                    >
                      {{ item.normal_balance }}
                    </span>
                  </div>
                  <p v-if="item.definition" class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{{ item.definition }}</p>
                  <p v-if="item.formula_expression" class="text-[10px] font-mono text-rose-500 dark:text-rose-400 mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10M7 12h10M7 17h10"/></svg>
                    <span>Fórmula: {{ item.formula_expression }}</span>
                  </p>
                </div>
              </div>

              <!-- Acciones Visibles Móviles y Escritorio -->
              <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60 w-full sm:w-auto justify-end">
                <button 
                  @click="handleEdit(item)" 
                  class="px-3 py-1.5 text-[11px] bg-rose-100/80 hover:bg-rose-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-800 dark:text-slate-200 rounded-lg font-semibold transition active:scale-95 flex items-center gap-1"
                >
                  <svg v-if="authStore.user" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <svg v-else class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>Editar</span>
                </button>
                <button 
                  @click="handleDelete(item.id)" 
                  class="px-3 py-1.5 text-[11px] bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:hover:bg-rose-900 dark:border-rose-800/80 dark:text-rose-300 rounded-lg font-semibold transition active:scale-95 flex items-center gap-1"
                >
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  <span>Borrar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'
import { useAuthStore } from '../stores/useAuthStore'

const emit = defineEmits(['open-create', 'edit-item', 'require-auth'])

const store = useAccountingStore()
const authStore = useAuthStore()
const selectedDoc = ref(null)
const search = ref('')

watch(() => store.documents, (newDocs) => {
  if (!selectedDoc.value && newDocs.length) {
    selectedDoc.value = newDocs.find(d => d.short_code === 'ERI') || newDocs[0]
  }
}, { immediate: true })

function handleCreate() {
  if (!authStore.user) {
    emit('require-auth', 'Debes iniciar sesión para agregar nuevas cuentas al catálogo.')
    return
  }
  emit('open-create')
}

function handleEdit(item) {
  if (!authStore.user) {
    emit('require-auth', 'Debes iniciar sesión para editar los datos de las cuentas.')
    return
  }
  emit('edit-item', item)
}

function handleDelete(id) {
  if (!authStore.user) {
    emit('require-auth', 'Debes iniciar sesión para eliminar cuentas.')
    return
  }
  store.deleteItem(id)
}

const getNatureBadge = (nature) => {
  const colors = {
    activo: 'bg-blue-400',
    pasivo: 'bg-amber-400',
    capital: 'bg-emerald-400',
    ingreso: 'bg-teal-400',
    egreso: 'bg-rose-400',
    resultado: 'bg-purple-400',
    teoria: 'bg-indigo-400'
  }
  return colors[nature] || 'bg-slate-400'
}

const filteredSections = computed(() => {
  if (!selectedDoc.value?.sections) return []
  if (!search.value.trim()) return selectedDoc.value.sections

  const query = search.value.toLowerCase()
  return selectedDoc.value.sections.map(section => ({
    ...section,
    financial_items: section.financial_items.filter(item => 
      item.name?.toLowerCase().includes(query) ||
      item.code?.toLowerCase().includes(query) ||
      item.abbreviation?.toLowerCase().includes(query) ||
      item.definition?.toLowerCase().includes(query)
    )
  })).filter(section => section.financial_items.length > 0)
})
</script>
