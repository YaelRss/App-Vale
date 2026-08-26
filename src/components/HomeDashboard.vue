<template>
  <div class="space-y-6 sm:space-y-10 max-w-5xl mx-auto pb-16 animate-slide-up">
    <!-- Hero / Saludo y Pregunta de Selección -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-slate-800 dark:text-slate-100 shadow-sm relative overflow-hidden">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div class="space-y-3 text-center sm:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/80 rounded-full text-xs font-bold text-rose-600 dark:text-rose-300">
            <svg class="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>¡Hola, {{ userName }}!</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Selecciona una opción
          </h2>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
            ¿Qué deseas practicar o revisar en <strong class="text-rose-500">Conta App</strong> hoy? Elige una de las secciones principales a continuación:
          </p>
        </div>

        <!-- Mascota Calculadora Kawaii -->
        <div class="w-28 h-28 sm:w-36 sm:h-36 shrink-0 bg-gradient-to-tr from-rose-500 to-pink-400 p-2.5 rounded-3xl shadow-xl shadow-rose-500/25 flex items-center justify-center transform hover:scale-105 transition duration-200">
          <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    <!-- OPCIÓN #1 DESTACADA: CENTRO DE RETOS & JUEGOS (MÁS IMPORTANTE) -->
    <div class="relative group">
      <!-- Resplandor sutil -->
      <div class="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl opacity-35 group-hover:opacity-60 transition duration-300 blur-sm"></div>
      
      <div class="relative bg-white dark:bg-slate-900 border-2 border-rose-400 dark:border-rose-500 rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-100 dark:border-slate-800 pb-5">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 shrink-0">
              <svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h3 class="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">Centro de Retos & Flashcards</h3>
                <span class="px-3 py-1 bg-rose-500 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-xs">¡Recomendado!</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">La sección más importante para practicar y memorizar la teoría NIF.</p>
            </div>
          </div>
        </div>

        <p class="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          Ponte a prueba con 3 dinámicas interactivas: <strong>Clasificación de Estados Financieros</strong>, <strong>¿Carga o Abona?</strong> y <strong>Siglas Eureka</strong> con contador de racha y sistema de vidas.
        </p>

        <div class="pt-2">
          <button 
            @click="$emit('select-tab', 'juegos')"
            class="w-full sm:w-auto px-8 py-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-2xl text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-3 shadow-lg shadow-rose-500/30 touch-manipulation"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>¡Entrar al Centro de Retos Ahora!</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Título para las demás opciones -->
    <div class="pt-4">
      <h3 class="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
        <svg class="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
        <span>Opciones de Consulta y Teoría</span>
      </h3>
    </div>

    <!-- Rejilla de Opciones Espaciosa -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      <!-- Opción: Machote & Cuentas NIF -->
      <div 
        @click="$emit('select-tab', 'machote')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-3xl p-6 sm:p-7 space-y-4 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
          </div>
          <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Machote & Cuentas NIF</h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Consulta la estructura oficial de ERI, ESF, EFE y ECCC con buscador en vivo de cuentas y claves.
          </p>
        </div>

        <div class="pt-3 border-t border-rose-50 dark:border-slate-800/80 text-xs sm:text-sm font-bold text-rose-500 flex items-center justify-between">
          <span>Abrir Catálogo</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      <!-- Opción: Reglas & Esquemas de Mayor -->
      <div 
        @click="$emit('select-tab', 'teoria')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-3xl p-6 sm:p-7 space-y-4 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
          </div>
          <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Reglas & Esquemas de Mayor</h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Visualiza el esquema interactivo de la Cuenta "T" (DEBE/HABER), reglas de aumentos/disminuciones y cuentas complementarias.
          </p>
        </div>

        <div class="pt-3 border-t border-rose-50 dark:border-slate-800/80 text-xs sm:text-sm font-bold text-rose-500 flex items-center justify-between">
          <span>Ver Teoría</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      <!-- Opción: Simulador de Balance -->
      <div 
        @click="$emit('select-tab', 'simulador')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-3xl p-6 sm:p-7 space-y-4 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>
          </div>
          <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Simulador Ecuación & ERI</h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Ingresa montos numéricos para verificar el cuadre de Activo = Pasivo + Capital y la cascada del ERI.
          </p>
        </div>

        <div class="pt-3 border-t border-rose-50 dark:border-slate-800/80 text-xs sm:text-sm font-bold text-rose-500 flex items-center justify-between">
          <span>Abrir Simulador</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'

defineEmits(['select-tab'])
const authStore = useAuthStore()

const userName = computed(() => {
  return authStore.user?.user_metadata?.display_name || authStore.user?.email?.split('@')[0] || 'Valeria'
})
</script>
