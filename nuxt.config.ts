export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],

  devServer: {
    port: 3001,
  },

  runtimeConfig: {
    public: {
      kongUrl: 'http://localhost:8000',
    },
  },

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
