<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-3 sm:p-4 touch-scroll animate-pop-in">
    <div class="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl w-full max-w-md p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-xl text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
      <!-- Encabezado con Icono SVG -->
      <div class="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{{ isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión Requedida' }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Acceso a Edición en ContaMaster</p>
          </div>
        </div>
        <button @click="$emit('close')" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 rounded-lg text-sm font-bold active:scale-95">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Alerta de Requerimiento de Inicio de Sesión para Edición -->
      <div v-if="noticeMessage" class="p-3 bg-amber-50 border border-amber-200 dark:bg-amber-950/60 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-xl text-xs flex items-start gap-2.5 shadow-xs">
        <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div class="leading-relaxed font-semibold">
          {{ noticeMessage }}
        </div>
      </div>

      <!-- Alerta de Error -->
      <div v-if="authStore.authError" class="p-3 bg-rose-50 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2">
        <svg class="w-4 h-4 shrink-0 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>{{ authStore.authError }}</span>
      </div>

      <!-- Formulario Supabase Auth -->
      <form @submit.prevent="handleSubmit" class="space-y-3.5 text-xs">
        <div v-if="isRegisterMode">
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Nombre</label>
          <input v-model="displayName" required type="text" placeholder="Valeria" class="w-full p-3 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-400 text-sm text-slate-800 dark:text-slate-200 outline-none" />
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Correo Electrónico</label>
          <input v-model="email" required type="email" placeholder="valeria@ejemplo.com" class="w-full p-3 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-400 text-sm text-slate-800 dark:text-slate-200 outline-none" />
        </div>

        <div>
          <label class="block font-semibold mb-1 text-slate-600 dark:text-slate-300">Contraseña</label>
          <input v-model="password" required type="password" placeholder="••••••••" class="w-full p-3 bg-rose-50/30 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-400 text-sm text-slate-800 dark:text-slate-200 outline-none" />
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full py-3 bg-rose-500 hover:bg-rose-600 active:scale-95 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 touch-manipulation"
        >
          <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span v-else>{{ isRegisterMode ? 'Registrarme' : 'Entrar para Editar' }}</span>
        </button>
      </form>

      <!-- Divisor -->
      <div class="relative flex items-center justify-center py-1">
        <div class="border-t border-slate-200 dark:border-slate-800 w-full"></div>
        <span class="bg-white dark:bg-slate-900 px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">o</span>
      </div>

      <!-- Botón Modo Offline Inmediato -->
      <button 
        type="button" 
        @click="handleOfflineAccess"
        class="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 touch-manipulation"
      >
        <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span>Entrar como Invitada (Valeria)</span>
      </button>

      <!-- Alternador Login / Registro -->
      <div class="text-center pt-2">
        <button 
          type="button" 
          @click="isRegisterMode = !isRegisterMode" 
          class="text-xs text-rose-500 hover:text-rose-600 font-semibold p-1"
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

defineProps({ 
  isOpen: Boolean,
  noticeMessage: {
    type: String,
    default: ''
  }
})
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
