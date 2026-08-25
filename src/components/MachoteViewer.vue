<template>
  <div class="space-y-6 max-w-6xl mx-auto">
    <!-- Selector de Estados Financieros -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <button 
          v-for="doc in store.documents"
          :key="doc.id"
          @click="selectedDoc = doc"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition border',
            selectedDoc?.id === doc.id 
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          ]"
        >
          {{ doc.short_code }} • {{ doc.title }}
        </button>
      </div>

      <button 
        @click="$emit('open-create')"
        class="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
      >
        <span>➕</span> Nueva Cuenta
      </button>
    </div>

    <!-- Buscador en tiempo real -->
    <div class="relative">
      <input 
        v-model="search"
        type="text"
        placeholder="🔍 Buscar cuenta, clave o sigla (ej. Clientes, RIF, PPEMOI, Acreedores)..."
        class="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button v-if="search" @click="search = ''" class="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 text-xs">✕</button>
    </div>

    <!-- Contenedor del Machote -->
    <div v-if="selectedDoc" class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div class="p-6 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">{{ selectedDoc.nif_reference }}</span>
          <h2 class="text-lg font-black text-slate-100">{{ selectedDoc.title }}</h2>
          <p class="text-xs text-slate-400 mt-0.5">{{ selectedDoc.description }}</p>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div v-for="section in filteredSections" :key="section.id" class="space-y-3">
          <h3 class="text-xs font-black tracking-wider uppercase text-slate-400 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="getNatureBadge(section.nature)"></span>
            {{ section.name }}
          </h3>

          <div class="grid gap-2">
            <div 
              v-for="item in section.financial_items" 
              :key="item.id"
              class="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-2xl border transition group"
              :class="item.is_group_total ? 'bg-indigo-950/30 border-indigo-500/30 font-bold' : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'"
            >
              <div class="flex items-start md:items-center gap-3">
                <span v-if="item.code" class="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md text-[10px] font-mono font-bold">
                  {{ item.code }}
                </span>
                <span v-if="item.abbreviation" class="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-md text-[10px] font-mono font-bold">
                  {{ item.abbreviation }}
                </span>
                <span v-if="item.operation_sign" class="w-5 h-5 flex items-center justify-center bg-slate-800 text-slate-300 rounded text-[10px] font-mono font-black">
                  {{ item.operation_sign }}
                </span>

                <div>
                  <div class="text-xs font-bold text-slate-200 flex items-center gap-2">
                    {{ item.name }}
                    <span 
                      class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase"
                      :class="item.normal_balance === 'Deudora' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'"
                    >
                      {{ item.normal_balance }}
                    </span>
                  </div>
                  <p v-if="item.definition" class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{{ item.definition }}</p>
                  <p v-if="item.formula_expression" class="text-[10px] font-mono text-indigo-400 mt-0.5">📐 Fórmula: {{ item.formula_expression }}</p>
                </div>
              </div>

              <!-- Acciones -->
              <div class="mt-2 md:mt-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button @click="$emit('edit-item', item)" class="px-2.5 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold">Editar</button>
                <button @click="store.deleteItem(item.id)" class="px-2.5 py-1 text-[10px] bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg font-semibold">Borrar</button>
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

const store = useAccountingStore()
const selectedDoc = ref(null)
const search = ref('')

watch(() => store.documents, (newDocs) => {
  if (!selectedDoc.value && newDocs.length) {
    selectedDoc.value = newDocs.find(d => d.short_code === 'ERI') || newDocs[0]
  }
}, { immediate: true })

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
  return colors[nature] || 'bg-slate-500'
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
