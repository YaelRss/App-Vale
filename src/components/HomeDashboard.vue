<template>
  <div class="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-12 animate-slide-up">
    <!-- Hero / saludo de bienvenida para Valeria -->
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-slate-800 dark:text-slate-100 shadow-xs relative overflow-hidden">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div class="space-y-2 text-center sm:text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 rounded-full text-[10px] sm:text-xs font-bold text-rose-600 dark:text-rose-300">
            <svg class="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Plataforma de Estudio NIF</span>
          </div>
          <h2 class="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            ¡Hola, {{ userName }}! ✨
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            ¿Qué deseas practicar o consultar hoy? Selecciona una sección para comenzar tu sesión de aprendizaje.
          </p>
        </div>

        <!-- Mascota Calculadora Kawaii en el Hero -->
        <div class="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gradient-to-tr from-rose-500 to-pink-400 p-2 rounded-3xl shadow-lg shadow-rose-500/25 flex items-center justify-center transform hover:scale-105 transition duration-200">
          <img src="/favicon.svg" alt="Calculadora Kawaii" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    <!-- SECCIÓN DESTACADA #1: CENTRO DE RETOS Y JUESTOS (MÁS IMPORTANTE) -->
    <div class="relative group">
      <!-- Glow sutil de recomendación -->
      <div class="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-60 transition duration-300 blur-xs"></div>
      
      <div class="relative bg-white dark:bg-slate-900 border-2 border-rose-400 dark:border-rose-500/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4 shadow-md">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-100 dark:border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 shrink-0">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-xl font-black text-slate-900 dark:text-white">Centro de Retos & Flashcards</h3>
                <span class="px-2.5 py-0.5 bg-rose-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider shadow-xs">¡Principal!</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">La mejor forma de memorizar y dominar los conceptos contables.</p>
            </div>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Ponte a prueba con 3 dinámicas interactivas: <strong>Clasificación de estados</strong>, <strong>Cargas y Abonos</strong>, y <strong>Siglas Eureka</strong> con racha de puntos y vidas.
        </p>

        <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button 
            @click="$emit('select-tab', 'juegos')"
            class="px-6 py-3 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 touch-manipulation"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>¡Entrar al Centro de Retos Ahora!</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Título Módulos Separados -->
    <div class="pt-2">
      <h3 class="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
        <svg class="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
        <span>Módulos de Consulta y Teoría</span>
      </h3>
    </div>

    <!-- Tarjetas de Módulos Secundarios Separados -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Tarjeta: Machote & Cuentas -->
      <div 
        @click="$emit('select-tab', 'machote')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-2xl p-5 space-y-3 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-2">
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
          </div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Machote & Cuentas NIF</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Explora la estructura completa de ERI, ESF, EFE y ECCC extraída de los archivos base.
          </p>
        </div>

        <div class="pt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
          <span>Abrir Catálogo</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      <!-- Tarjeta: Reglas & T de Mayor -->
      <div 
        @click="$emit('select-tab', 'teoria')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-2xl p-5 space-y-3 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-2">
          <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
          </div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Reglas & Esquemas de Mayor</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Repasa el diagrama interactivo de la Cuenta "T", reglas de cargos, abonos y cuentas complementarias.
          </p>
        </div>

        <div class="pt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
          <span>Ver Teoría</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      <!-- Tarjeta: Simulador Balance -->
      <div 
        @click="$emit('select-tab', 'simulador')"
        class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 rounded-2xl p-5 space-y-3 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>
          </div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Simulador de Ecuación</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Verifica el cuadre de Activo = Pasivo + Capital y la cascada del ERI con valores numéricos.
          </p>
        </div>

        <div class="pt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
          <span>Abrir Simulador</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
