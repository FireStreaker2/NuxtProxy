// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
  routeRules: {
    "/bare/": { proxy: "https://tomp.app/" },
    "/bare/**": { proxy: "https://tomp.app/**" },
  }
});
