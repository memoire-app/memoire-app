// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  ssr: false,
  icon: {
    serverBundle: "remote",
    localApiEndpoint: "/icon",
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@vueuse/motion/nuxt",
    [
      "@nuxtjs/i18n",
      {
        i18n: {
          vueI18n: "./i18n.config.ts",
        },
      },
    ],
  ],
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      BACK_URL: process.env.NUXT_PUBLIC_BACK_URL,
    },
  },

  compatibilityDate: "2024-09-15",
});
