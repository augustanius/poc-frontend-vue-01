import type { LoginInput } from '../schemas/auth.schema'
import type { User } from '../types/auth.types'

export class AuthService {
  static async login(credentials: LoginInput): Promise<User> {
    // Mock implementation - replace with real API call later
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            id: '1',
            email: credentials.email,
            name: 'Admin User',
            role: 'admin',
          })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  static async me(): Promise<User | null> {
    // Mock implementation - replace with real API call later
    return null
  }

  static async logout(): Promise<void> {
    // Mock implementation - replace with real API call later
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  }
}
