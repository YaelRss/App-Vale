<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-3 sm:p-4 touch-scroll animate-pop-in">
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl w-full max-w-lg p-4 sm:p-6 space-y-4 shadow-xl text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-rose-100 dark:border-slate-800">
        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{{ isEditing ? 'Editar Cuenta' : 'Agregar Nueva Cuenta' }}</h3>
        <button @click="$emit('close')" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 rounded-lg text-sm font-bold active:scale-95 transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-3 text-xs">
        <div>
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Sección / Agrupación</label>
          <select v-model="form.section_id" required class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-400 text-sm text-slate-800 dark:text-slate-200">
            <option disabled value="">Selecciona una sección...</option>
            <optgroup v-for="doc in store.documents" :key="doc.id" :label="doc.title">
              <option v-for="sec in doc.sections" :key="sec.id" :value="sec.id">
                {{ doc.short_code }} - {{ sec.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Código</label>
            <input v-model="form.code" placeholder="ej. BB.1" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Abreviatura</label>
            <input v-model="form.abbreviation" placeholder="ej. PROV" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Signo</label>
            <select v-model="form.operation_sign" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100">
              <option value="">Ninguno</option>
              <option value="+">(+) Suma</option>
              <option value="-">(-) Resta</option>
              <option value="(=)">(=) Subtotal</option>
              <option value="(+/-)">(+/-) Mixto</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Nombre de la Cuenta</label>
          <input v-model="form.name" required placeholder="ej. Proveedores nacionales" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Naturaleza</label>
            <select v-model="form.normal_balance" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100">
              <option value="Deudora">Deudora (Aumenta Cargando)</option>
              <option value="Acreedora">Acreedora (Aumenta Abonando)</option>
              <option value="Variable">Variable</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Fórmula (opcional)</label>
            <input v-model="form.formula_expression" placeholder="ej. Ventas - Costos" class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100" />
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Definición / Explicación para Valeria</label>
          <textarea v-model="form.definition" rows="2" placeholder="Explica qué representa la cuenta..." class="w-full p-2.5 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100"></textarea>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-rose-100 dark:border-slate-800">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 rounded-xl font-bold text-xs transition text-slate-700 dark:text-slate-200">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-xl font-bold text-xs transition shadow-md shadow-rose-500/20">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAccountingStore } from '../stores/useAccountingStore'

const props = defineProps({
  isOpen: Boolean,
  itemData: Object
})
const emit = defineEmits(['close'])
const store = useAccountingStore()

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

const isEditing = computed(() => !!form.value.id)

watch(() => props.itemData, (val) => {
  if (val) {
    form.value = { ...val }
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
}, { immediate: true })

async function handleSave() {
  await store.upsertItem(form.value)
  emit('close')
}
</script>
