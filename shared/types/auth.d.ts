declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    name: string
    username: string
    roles: string[]
  }

  interface UserSession {
    loggedInAt: number
  }

  interface SecureSessionData {
    accessToken: string
    refreshToken: string
  }
}

export {}
