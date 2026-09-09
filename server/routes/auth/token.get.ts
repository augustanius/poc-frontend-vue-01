export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  if (!session.secure?.accessToken) {
    throw createError({
      statusCode: 401,
      message: 'No access token available',
    })
  }

  return {
    accessToken: session.secure.accessToken,
  }
})
