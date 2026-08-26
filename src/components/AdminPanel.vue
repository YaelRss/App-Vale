<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-16 animate-slide-up font-sans">
    <!-- ENCABEZADO PANEL DE EDICIÓN NIF -->
    <div class="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-xs font-bold text-rose-300">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Panel Independiente de Gestión</span>
        </div>
        <h2 class="text-xl sm:text-3xl font-black tracking-tight">Panel de Edición NIF</h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Administra, modifica y agrega cuentas contables a los 4 estados financieros oficiales.
        </p>
      </div>

      <button 
        @click="openForm(null)"
        class="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 shrink-0 touch-manipulation"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>+ Agregar Nueva Cuenta</span>
      </button>
    </div>

    <!-- FORMULARIO DE EDICIÓN ESPACIOSO INDEPENDIENTE -->
    <div v-if="isEditingForm" class="bg-white dark:bg-slate-900 border-2 border-rose-400 dark:border-rose-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-pop-in">
      <div class="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-md">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {{ form.id ? 'Editar Cuenta Contable' : 'Agregar Nueva Cuenta Contable' }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Edita los campos en este panel independiente</p>
          </div>
        </div>
        <button @click="isEditingForm = false" class="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-4 text-xs sm:text-sm">
        <div>
          <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Sección / Agrupación Contable</label>
          <select v-model="form.section_id" required class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-rose-400 outline-none">
            <option disabled value="">Selecciona la sección correspondiente...</option>
            <optgroup v-for="doc in store.documents" :key="doc.id" :label="doc.title">
              <option v-for="sec in doc.sections" :key="sec.id" :value="sec.id">
                {{ doc.short_code }} - {{ sec.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Código</label>
            <input v-model="form.code" placeholder="ej. BB.1" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400" />
          </div>
          <div>
            <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Abreviatura / Sigla</label>
            <input v-model="form.abbreviation" placeholder="ej. PROV" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400" />
          </div>
          <div>
            <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Signo Operativo</label>
            <select v-model="form.operation_sign" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400">
              <option value="">Ninguno</option>
              <option value="+">(+) Suma</option>
              <option value="-">(-) Resta</option>
              <option value="(=)">(=) Subtotal</option>
              <option value="(+/-)">(+/-) Mixto</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Nombre Oficial de la Cuenta</label>
          <input v-model="form.name" required placeholder="ej. Proveedores nacionales" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Naturaleza Contable</label>
            <select v-model="form.normal_balance" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400">
              <option value="Deudora">Deudora (Aumenta Cargando)</option>
              <option value="Acreedora">Acreedora (Aumenta Abonando)</option>
              <option value="Variable">Variable</option>
            </select>
          </div>
          <div>
            <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Fórmula (opcional)</label>
            <input v-model="form.formula_expression" placeholder="ej. Ventas - Costos" class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400" />
          </div>
        </div>

        <div>
          <label class="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">Definición / Explicación para Valeria</label>
          <textarea v-model="form.definition" rows="3" placeholder="Explica qué representa la cuenta contable..." class="w-full p-3.5 bg-rose-50/40 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400"></textarea>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-rose-100 dark:border-slate-800">
          <button type="button" @click="isEditingForm = false" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 rounded-2xl font-bold text-xs sm:text-sm transition text-slate-700 dark:text-slate-200">Cancelar</button>
          <button type="submit" class="px-6 py-3 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-2xl font-bold text-xs sm:text-sm transition shadow-md shadow-rose-500/20">Guardar Cambios</button>
        </div>
      </form>
    </div>

    <!-- SELECTOR DE DOCUMENTOS Y BUSCADOR -->
    <div class="space-y-4">
      <div class="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button 
          v-for="doc in store.documents" 
          :key="doc.id"
          @click="selectedDoc = doc"
          :class="[
            'px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-150 whitespace-nowrap shrink-0 touch-manipulation active:scale-95',
            selectedDoc?.id === doc.id 
              ? 'bg-rose-500 text-white border-rose-500 shadow-md font-bold' 
              : 'bg-white dark:bg-slate-900 border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50'
          ]"
        >
          {{ doc.short_code }} • {{ doc.title }}
        </button>
      </div>

      <div class="relative">
        <div class="absolute left-4 top-4 text-slate-400 pointer-events-none">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input 
          v-model="search"
          type="text"
          placeholder="Filtrar cuentas para editar..."
          class="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
    </div>

    <!-- LISTA COMPLETA DE CUENTAS CON ACCIONES INDEPENDIENTES -->
    <div v-if="selectedDoc" class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
      <div class="p-5 sm:p-6 bg-rose-50/50 dark:bg-slate-950/80 border-b border-rose-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">Cuentas Registradas en {{ selectedDoc.short_code }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Selecciona cualquier cuenta para modificarla o borrarla</p>
        </div>
      </div>

      <div class="p-4 sm:p-6 space-y-6">
        <div v-for="section in filteredSections" :key="section.id" class="space-y-3">
          <h4 class="text-xs font-black uppercase text-rose-950 dark:text-slate-400 tracking-wider">
            {{ section.name }}
          </h4>

          <div class="grid gap-3">
            <div 
              v-for="item in section.financial_items" 
              :key="item.id"
              class="p-4 rounded-2xl border bg-white dark:bg-slate-950/70 border-rose-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
            >
              <div class="space-y-1 flex-1">
                <div class="flex items-center gap-2">
                  <span v-if="item.code" class="px-2 py-0.5 bg-rose-100 dark:bg-slate-800 text-rose-900 dark:text-slate-300 font-mono font-bold text-xs rounded-md">{{ item.code }}</span>
                  <span class="text-sm font-bold text-slate-900 dark:text-white">{{ item.name }}</span>
                  <span class="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-bold">{{ item.normal_balance }}</span>
                </div>
                <p v-if="item.definition" class="text-xs text-slate-500 dark:text-slate-400">{{ item.definition }}</p>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button 
                  @click="openForm(item)"
                  class="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-sm flex items-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span>Editar</span>
                </button>
                <button 
                  @click="deleteItem(item.id)"
                  class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold rounded-xl text-xs transition active:scale-95 flex items-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
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

const store = useAccountingStore()
const selectedDoc = ref(null)
const search = ref('')
const isEditingForm = ref(false)

const form = ref({
  id: null,
  section_id: '',
  code: '',
  abbreviation: '',
  name: '',
  operation_sign: '',
  normal_balance: 'Deudora',
  formula_expression: '',
  definition: ''
})

watch(() => store.documents, (docs) => {
  if (!selectedDoc.value && docs.length) {
    selectedDoc.value = docs[0]
  }
}, { immediate: true })

function openForm(item = null) {
  if (item) {
    form.value = { ...item }
  } else {
    form.value = {
      id: null,
      section_id: '',
      code: '',
      abbreviation: '',
      name: '',
      operation_sign: '',
      normal_balance: 'Deudora',
      formula_expression: '',
      definition: ''
    }
  }
  isEditingForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function handleSave() {
  await store.upsertItem(form.value)
  isEditingForm.value = false
}

async function deleteItem(id) {
  if (confirm('¿Estás segura de eliminar esta cuenta?')) {
    await store.deleteItem(id)
  }
}

const filteredSections = computed(() => {
  if (!selectedDoc.value?.sections) return []
  if (!search.value.trim()) return selectedDoc.value.sections

  const q = search.value.toLowerCase()
  return selectedDoc.value.sections.map(sec => ({
    ...sec,
    financial_items: sec.financial_items.filter(i => 
      i.name?.toLowerCase().includes(q) ||
      i.code?.toLowerCase().includes(q) ||
      i.abbreviation?.toLowerCase().includes(q)
    )
  })).filter(sec => sec.financial_items.length > 0)
})
</script>
