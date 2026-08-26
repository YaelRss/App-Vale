import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('conta_user_session') || 'null'))
  const loading = ref(false)
  const authError = ref(null)

  // Inicializar estado de sesión
  async function initAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        user.value = session.user
        localStorage.setItem('conta_user_session', JSON.stringify(session.user))
      }
    } catch (e) {
      console.warn('Sin conexión para validar sesión remota, manteniendo sesión en caché.', e)
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        user.value = session.user
        localStorage.setItem('conta_user_session', JSON.stringify(session.user))
      } else if (!navigator.onLine && user.value) {
        // Mantener sesión offline
      } else {
        user.value = null
        localStorage.removeItem('conta_user_session')
      }
    })
  }

  // Iniciar sesión con Correo y Contraseña
  async function login(email, password) {
    loading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      user.value = data.user
      localStorage.setItem('conta_user_session', JSON.stringify(data.user))
      return { success: true }
    } catch (err) {
      authError.value = err.message || 'Error al iniciar sesión'
      return { success: false, error: authError.value }
    } finally {
      loading.value = false
    }
  }

  // Registro de nueva cuenta
  async function register(email, password, displayName = 'Valeria') {
    loading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } }
      })
      if (error) throw error
      user.value = data.user
      localStorage.setItem('conta_user_session', JSON.stringify(data.user))
      return { success: true }
    } catch (err) {
      authError.value = err.message || 'Error al registrar usuario'
      return { success: false, error: authError.value }
    } finally {
      loading.value = false
    }
  }

  // Acceso Local / Sin conexión para Valeria
  function loginOfflineGuest(name = 'Valeria') {
    const guestUser = {
      id: 'local-offline-user',
      email: 'valeria@local.pwa',
      user_metadata: { display_name: name },
      is_offline: true
    }
    user.value = guestUser
    localStorage.setItem('conta_user_session', JSON.stringify(guestUser))
  }

  // Cerrar sesión
  async function logout() {
    try {
      if (navigator.onLine && !user.value?.is_offline) {
        await supabase.auth.signOut()
      }
    } catch (e) {
      console.warn('Cierre de sesión local:', e)
    } finally {
      user.value = null
      localStorage.removeItem('conta_user_session')
    }
  }

  return {
    user,
    loading,
    authError,
    initAuth,
    login,
    register,
    loginOfflineGuest,
    logout
  }
})
