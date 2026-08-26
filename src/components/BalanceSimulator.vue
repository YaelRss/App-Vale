<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Selector de Simulador -->
    <div class="flex gap-2">
      <button 
        @click="simType = 'esf'"
        :class="simType === 'esf' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-800"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        <span>Ecuación del Balance (ESF)</span>
      </button>

      <button 
        @click="simType = 'eri'"
        :class="simType === 'eri' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-800"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        <span>Cascada de Resultados (ERI)</span>
      </button>
    </div>

    <!-- Simulador ESF -->
    <div v-if="simType === 'esf'" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 class="text-base font-bold text-slate-100">Simulador de Ecuación Contable: Activo = Pasivo + Capital</h3>
          <p class="text-xs text-slate-400">Modifica los rubros para verificar el cuadre de la partida doble.</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4 text-xs">
        <!-- Activo -->
        <div class="p-4 bg-slate-950 border border-blue-900/40 rounded-2xl space-y-3">
          <div class="font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Activo Total</span>
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Activo Circulante</label>
            <input v-model.number="activoCirc" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Activo No Circulante</label>
            <input v-model.number="activoNoCirc" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div class="pt-2 border-t border-slate-800 text-xs font-mono font-bold text-blue-300">
            Total Activo: ${{ totalActivo.toLocaleString() }}
          </div>
        </div>

        <!-- Pasivo -->
        <div class="p-4 bg-slate-950 border border-amber-900/40 rounded-2xl space-y-3">
          <div class="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Pasivo Total</span>
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Pasivo Corto Plazo</label>
            <input v-model.number="pasivoCP" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Pasivo Largo Plazo</label>
            <input v-model.number="pasivoLP" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div class="pt-2 border-t border-slate-800 text-xs font-mono font-bold text-amber-300">
            Total Pasivo: ${{ totalPasivo.toLocaleString() }}
          </div>
        </div>

        <!-- Capital -->
        <div class="p-4 bg-slate-950 border border-emerald-900/40 rounded-2xl space-y-3">
          <div class="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Capital Contable</span>
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Capital Contribuido</label>
            <input v-model.number="capContribuido" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 text-[10px] mb-1">Capital Ganado / Resultados</label>
            <input v-model.number="capGanado" type="number" class="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div class="pt-2 border-t border-slate-800 text-xs font-mono font-bold text-emerald-300">
            Total Capital: ${{ totalCapital.toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- Estado de Cuadre con Icono SVG -->
      <div 
        :class="isEsfBalanced ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300'"
        class="p-4 rounded-2xl border text-xs font-bold flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <svg v-if="isEsfBalanced" class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          <svg v-else class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span v-if="isEsfBalanced">El balance está cuadrado: Activo (${{ totalActivo.toLocaleString() }}) = Pasivo + Capital (${{ (totalPasivo + totalCapital).toLocaleString() }})</span>
          <span v-else>Descuadre contable detectado por ${{ Math.abs(totalActivo - (totalPasivo + totalCapital)).toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Simulador ERI -->
    <div v-else class="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 text-xs">
      <h3 class="text-base font-bold text-slate-100">Calculadora de Resultados Cascada (NIF B-3)</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div>
            <label class="block text-slate-400 mb-1">Ventas / Ingresos Netos (+)</label>
            <input v-model.number="ventas" type="number" class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Costo de Ventas (-)</label>
            <input v-model.number="costoVentas" type="number" class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Gastos de Operación (Admin + Ventas) (-)</label>
            <input v-model.number="gastosOperacion" type="number" class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1">RIF (+/-)</label>
            <input v-model.number="rif" type="number" class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono" />
          </div>
        </div>

        <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5 font-mono">
          <div class="flex justify-between text-slate-400"><span>Utilidad Bruta:</span><span class="text-slate-200 font-bold">${{ utilBruta.toLocaleString() }}</span></div>
          <div class="flex justify-between text-slate-400"><span>Utilidad de Operación:</span><span class="text-slate-200 font-bold">${{ utilOperacion.toLocaleString() }}</span></div>
          <div class="flex justify-between text-slate-400"><span>Utilidad Antes de Impuestos:</span><span class="text-slate-200 font-bold">${{ utilAntesISR.toLocaleString() }}</span></div>
          <div class="flex justify-between text-rose-400"><span>ISR (30%):</span><span class="font-bold">-${{ isrCalculado.toLocaleString() }}</span></div>
          <div class="pt-2 border-t border-slate-800 flex justify-between text-emerald-400 text-sm font-bold"><span>Utilidad Neta:</span><span>${{ utilNeta.toLocaleString() }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const simType = ref('esf')

// ESF state
const activoCirc = ref(250000)
const activoNoCirc = ref(350000)
const pasivoCP = ref(120000)
const pasivoLP = ref(180000)
const capContribuido = ref(200000)
const capGanado = ref(100000)

const totalActivo = computed(() => (activoCirc.value || 0) + (activoNoCirc.value || 0))
const totalPasivo = computed(() => (pasivoCP.value || 0) + (pasivoLP.value || 0))
const totalCapital = computed(() => (capContribuido.value || 0) + (capGanado.value || 0))
const isEsfBalanced = computed(() => totalActivo.value === (totalPasivo.value + totalCapital.value))

// ERI state
const ventas = ref(500000)
const costoVentas = ref(200000)
const gastosOperacion = ref(120000)
const rif = ref(-10000)

const utilBruta = computed(() => (ventas.value || 0) - (costoVentas.value || 0))
const utilOperacion = computed(() => utilBruta.value - (gastosOperacion.value || 0))
const utilAntesISR = computed(() => utilOperacion.value + (rif.value || 0))
const isrCalculado = computed(() => utilAntesISR.value > 0 ? utilAntesISR.value * 0.3 : 0)
const utilNeta = computed(() => utilAntesISR.value - isrCalculado.value)
</script>
