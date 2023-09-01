// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/bare/": { proxy: "https://tomp.app/" },
    "/bare/**": { proxy: "https://tomp.app/**" },
  }
});
