<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-slate-100">
      <div class="flex justify-between items-center pb-2 border-b border-slate-800">
        <h3 class="text-base font-bold">{{ isEditing ? 'Editar Cuenta' : 'Agregar Nueva Cuenta' }}</h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white text-sm">✕</button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-3 text-xs">
        <div>
          <label class="block font-semibold mb-1 text-slate-300">Sección / Agrupación</label>
          <select v-model="form.section_id" required class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-200">
            <option disabled value="">Selecciona una sección...</option>
            <optgroup v-for="doc in store.documents" :key="doc.id" :label="doc.title">
              <option v-for="sec in doc.sections" :key="sec.id" :value="sec.id">
                {{ doc.short_code }} → {{ sec.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block font-semibold mb-1 text-slate-300">Código</label>
            <input v-model="form.code" placeholder="ej. BB.1" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-300">Abreviatura</label>
            <input v-model="form.abbreviation" placeholder="ej. PROV" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-300">Signo</label>
            <select v-model="form.operation_sign" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl">
              <option value="">Ninguno</option>
              <option value="+">(+) Suma</option>
              <option value="-">(-) Resta</option>
              <option value="(=)">(=) Subtotal</option>
              <option value="(+/-)">(+/-) Mixto</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-300">Nombre de la Cuenta</label>
          <input v-model="form.name" required placeholder="ej. Proveedores nacionales" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl" />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-semibold mb-1 text-slate-300">Naturaleza</label>
            <select v-model="form.normal_balance" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl">
              <option value="Deudora">Deudora (Aumenta Cargando)</option>
              <option value="Acreedora">Acreedora (Aumenta Abonando)</option>
              <option value="Variable">Variable</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-300">Fórmula (opcional)</label>
            <input v-model="form.formula_expression" placeholder="ej. Ventas - Costos" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl" />
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-300">Definición / Explicación para Valeria</label>
          <textarea v-model="form.definition" rows="2" placeholder="Explica qué representa la cuenta..." class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"></textarea>
        </div>

        <div class="flex justify-end gap-2 pt-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold">Guardar</button>
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
