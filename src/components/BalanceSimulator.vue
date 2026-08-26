<template>
  <div class="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
    <!-- Selector de Simulador Adaptable -->
    <div class="flex flex-col sm:flex-row gap-2">
      <button 
        @click="simType = 'esf'"
        :class="simType === 'esf' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-rose-50/50 dark:hover:bg-slate-800'"
        class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 border border-rose-100 dark:border-slate-800 touch-manipulation active:scale-95"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        <span>Ecuación del Balance (ESF)</span>
      </button>

      <button 
        @click="simType = 'eri'"
        :class="simType === 'eri' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-rose-50/50 dark:hover:bg-slate-800'"
        class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 border border-rose-100 dark:border-slate-800 touch-manipulation active:scale-95"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        <span>Cascada de Resultados (ERI)</span>
      </button>
    </div>

    <!-- Simulador ESF Adaptable -->
    <div v-if="simType === 'esf'" class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-rose-100 dark:border-slate-800 pb-3 sm:pb-4">
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">Simulador de Ecuación Contable: Activo = Pasivo + Capital</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Modifica los rubros para verificar el cuadre de la partida doble.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
        <!-- Activo -->
        <div class="p-3.5 sm:p-4 bg-blue-50/40 dark:bg-slate-950 border border-blue-200/60 dark:border-blue-900/40 rounded-2xl space-y-3">
          <div class="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Activo Total</span>
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Activo Circulante</label>
            <input 
              v-model.number="activoCirc" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Activo No Circulante</label>
            <input 
              v-model.number="activoNoCirc" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
          <div class="pt-2 border-t border-blue-200/60 dark:border-slate-800 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
            Total Activo: ${{ totalActivo.toLocaleString() }}
          </div>
        </div>

        <!-- Pasivo -->
        <div class="p-3.5 sm:p-4 bg-amber-50/40 dark:bg-slate-950 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl space-y-3">
          <div class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Pasivo Total</span>
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Pasivo Corto Plazo</label>
            <input 
              v-model.number="pasivoCP" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Pasivo Largo Plazo</label>
            <input 
              v-model.number="pasivoLP" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-400" 
            />
          </div>
          <div class="pt-2 border-t border-amber-200/60 dark:border-slate-800 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
            Total Pasivo: ${{ totalPasivo.toLocaleString() }}
          </div>
        </div>

        <!-- Capital -->
        <div class="p-3.5 sm:p-4 bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/60 dark:border-emerald-900/40 rounded-2xl space-y-3 sm:col-span-2 lg:col-span-1">
          <div class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span>Capital Contable</span>
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Capital Contribuido</label>
            <input 
              v-model.number="capContribuido" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 text-[10px] mb-1">Capital Ganado / Resultados</label>
            <input 
              v-model.number="capGanado" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400" 
            />
          </div>
          <div class="pt-2 border-t border-emerald-200/60 dark:border-slate-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
            Total Capital: ${{ totalCapital.toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- Estado de Cuadre con Icono SVG -->
      <div 
        :class="isEsfBalanced ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'"
        class="p-3.5 sm:p-4 rounded-2xl border text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
      >
        <div class="flex items-start sm:items-center gap-2">
          <svg v-if="isEsfBalanced" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          <svg v-else class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span v-if="isEsfBalanced" class="leading-relaxed">El balance está cuadrado: Activo (${{ totalActivo.toLocaleString() }}) = Pasivo + Capital (${{ (totalPasivo + totalCapital).toLocaleString() }})</span>
          <span v-else class="leading-relaxed">Descuadre contable detectado por ${{ Math.abs(totalActivo - (totalPasivo + totalCapital)).toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Simulador ERI Adaptable -->
    <div v-else class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 text-xs shadow-xs">
      <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">Calculadora de Resultados Cascada (NIF B-3)</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div>
            <label class="block text-slate-500 dark:text-slate-400 mb-1">Ventas / Ingresos Netos (+)</label>
            <input 
              v-model.number="ventas" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-rose-50/20 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 mb-1">Costo de Ventas (-)</label>
            <input 
              v-model.number="costoVentas" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-rose-50/20 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 mb-1">Gastos de Operación (Admin + Ventas) (-)</label>
            <input 
              v-model.number="gastosOperacion" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-rose-50/20 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-400" 
            />
          </div>
          <div>
            <label class="block text-slate-500 dark:text-slate-400 mb-1">RIF (+/-)</label>
            <input 
              v-model.number="rif" 
              type="number" 
              inputmode="decimal"
              class="w-full p-2.5 bg-rose-50/20 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-400" 
            />
          </div>
        </div>

        <div class="p-4 bg-rose-50/30 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 rounded-2xl space-y-3 font-mono">
          <div class="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>Utilidad Bruta:</span><span class="text-slate-800 dark:text-slate-200 font-bold">${{ utilBruta.toLocaleString() }}</span></div>
          <div class="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>Utilidad de Operación:</span><span class="text-slate-800 dark:text-slate-200 font-bold">${{ utilOperacion.toLocaleString() }}</span></div>
          <div class="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>Utilidad Antes de Impuestos:</span><span class="text-slate-800 dark:text-slate-200 font-bold">${{ utilAntesISR.toLocaleString() }}</span></div>
          <div class="flex justify-between items-center text-rose-600 dark:text-rose-400"><span>ISR (30%):</span><span class="font-bold">-${{ isrCalculado.toLocaleString() }}</span></div>
          <div class="pt-2 border-t border-rose-200/80 dark:border-slate-800 flex justify-between items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold"><span>Utilidad Neta:</span><span>${{ utilNeta.toLocaleString() }}</span></div>
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
