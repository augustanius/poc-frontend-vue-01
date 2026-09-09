import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const kongFetch = ofetch.create({
    baseURL: config.public.kongUrl,
  })

  return {
    provide: {
      kongFetch,
    },
  }
})
