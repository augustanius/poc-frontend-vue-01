import { AuthService } from '../services/auth.service'
import type { LoginInput } from '../schemas/auth.schema'

export function useAuth() {
  const { user, clear: clearSession, fetch: fetchSession } = useUserSession()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (credentials: LoginInput) => {
    loading.value = true
    error.value = null
    try {
      await AuthService.login(credentials)
      await fetchSession()
      await navigateTo('/dashboard')
    }
    catch (err: any) {
      error.value = err?.data?.message || 'Authentication failed'
    }
    finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await AuthService.logout()
    await clearSession()
    await navigateTo('/auth/login')
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
  }
}
