import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetch = ofetch.create({
    baseURL: config.public.kongUrl,
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
