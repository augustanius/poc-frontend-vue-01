export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],

  icon: {
    size: '24px',
    customCollections: [],
  },

  auth: {
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false,
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-09-09',
})
