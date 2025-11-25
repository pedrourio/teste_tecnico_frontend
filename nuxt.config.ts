// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],


  app: {
    head: {
      title: 'Posts',
      htmlAttrs: {
        lang: 'pt',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      
      script: [                               
        { src: 'https://cdn.tailwindcss.com' } 
                                    

      ]
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000' 
    }
  }
  
})

