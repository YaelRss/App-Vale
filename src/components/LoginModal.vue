<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl text-slate-100">
      <!-- Encabezado con Icono SVG -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-100">{{ isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h3>
            <p class="text-xs text-slate-400">Acceso a ContaMaster PWA</p>
          </div>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Alerta de Error -->
      <div v-if="authStore.authError" class="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
        <svg class="w-4 h-4 shrink-0 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>{{ authStore.authError }}</span>
      </div>

      <!-- Formulario Supabase Auth -->
      <form @submit.prevent="handleSubmit" class="space-y-3.5 text-xs">
        <div v-if="isRegisterMode">
          <label class="block font-semibold mb-1 text-slate-300">Nombre</label>
          <input v-model="displayName" required type="text" placeholder="Valeria" class="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-200 outline-none" />
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-300">Correo Electrónico</label>
          <input v-model="email" required type="email" placeholder="valeria@ejemplo.com" class="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-200 outline-none" />
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-300">Contraseña</label>
          <input v-model="password" required type="password" placeholder="••••••••" class="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-200 outline-none" />
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span v-else>{{ isRegisterMode ? 'Registrarme' : 'Entrar' }}</span>
        </button>
      </form>

      <!-- Divisor -->
      <div class="relative flex items-center justify-center py-1">
        <div class="border-t border-slate-800 w-full"></div>
        <span class="bg-slate-900 px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">o</span>
      </div>

      <!-- Botón Modo Offline Inmediato -->
      <button 
        type="button" 
        @click="handleOfflineAccess"
        class="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span>Continuar en Modo Offline (Sin conexión)</span>
      </button>

      <!-- Alternador Login / Registro -->
      <div class="text-center pt-2">
        <button 
          type="button" 
          @click="isRegisterMode = !isRegisterMode" 
          class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          {{ isRegisterMode ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'

defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const authStore = useAuthStore()
const isRegisterMode = ref(false)
const email = ref('')
const password = ref('')
const displayName = ref('Valeria')

async function handleSubmit() {
  let res
  if (isRegisterMode.value) {
    res = await authStore.register(email.value, password.value, displayName.value)
  } else {
    res = await authStore.login(email.value, password.value)
  }
  if (res.success) {
    emit('close')
  }
}

function handleOfflineAccess() {
  authStore.loginOfflineGuest('Valeria')
  emit('close')
}
</script>
