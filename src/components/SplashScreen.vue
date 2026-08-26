<template>
  <div 
    v-if="isVisible"
    class="fixed inset-0 z-50 bg-rose-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 font-sans"
    :class="{ 'opacity-0 pointer-events-none': isFading }"
  >
    <!-- Contenedor del Logo con Animación Pulse/Pop -->
    <div class="relative mb-6">
      <!-- Glow de Fondo -->
      <div class="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-30 blur-lg animate-pulse"></div>
      
      <!-- Icono Kawaii Calculadora -->
      <div class="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-400 p-2 shadow-2xl shadow-rose-500/30 flex items-center justify-center animate-pop-in">
        <img src="/favicon.svg" alt="Conta App Logo" class="w-full h-full object-contain" />
      </div>
    </div>

    <!-- Título y Subtítulo de la App -->
    <div class="space-y-2 max-w-xs animate-slide-up">
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Conta App
      </h1>
      <p class="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
        Plataforma NIF • Valeria
      </p>
    </div>

    <!-- Barra de Carga Animada -->
    <div class="w-48 sm:w-56 h-2 bg-rose-200/60 dark:bg-slate-800 rounded-full overflow-hidden mt-8 shadow-inner">
      <div class="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full animate-pulse w-full"></div>
    </div>

    <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-4 font-medium">Cargando módulos contables...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(true)
const isFading = ref(false)

onMounted(() => {
  setTimeout(() => {
    isFading.value = true
    setTimeout(() => {
      isVisible.value = false
    }, 500)
  }, 1600)
})
</script>
