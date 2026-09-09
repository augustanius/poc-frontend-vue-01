import type { User } from '../types/auth.types'

export class AuthService {
  static async getAccessToken(): Promise<string> {
    const data = await $fetch<{ accessToken: string }>('/api/auth/token')
    return data.accessToken
  }

  static async getUser(): Promise<User | null> {
    const { user } = useUserSession()
    if (!user.value) return null
    return {
      id: user.value.id,
      email: user.value.email,
      name: user.value.name,
      role: user.value.roles?.[0] || 'user',
    }
  }

  static async logout(): Promise<void> {
    await $fetch('/api/auth/logout', { method: 'POST' })
  }
}
