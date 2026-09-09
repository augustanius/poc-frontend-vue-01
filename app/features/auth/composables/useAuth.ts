import { AuthService } from '../services/auth.service'

export function useAuth() {
  const { user, clear: clearSession, fetch: fetchSession } = useUserSession()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async () => {
    loading.value = true
    error.value = null
    try {
      window.location.href = '/auth/keycloak'
    }
    catch (err: any) {
      error.value = err?.data?.message || 'Authentication failed'
    }
    finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await AuthService.logout()
      await clearSession()
      await navigateTo('/auth/login')
    }
    catch (err: any) {
      error.value = err?.data?.message || 'Logout failed'
    }
    finally {
      loading.value = false
    }
  }

  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await AuthService.getAccessToken()
    }
    catch {
      return null
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    getAccessToken,
  }
}
