export default defineOAuthKeycloakEventHandler({
  config: {
    scope: ['openid', 'email', 'profile'],
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email,
        name: user.name || user.preferred_username,
        username: user.preferred_username,
        roles: user.roles || [],
      },
      secure: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/dashboard')
  },
  onError(event, error) {
    console.error('Keycloak OAuth error:', error)
    return sendRedirect(event, '/auth/login')
  },
})
