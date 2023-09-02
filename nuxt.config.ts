// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	routeRules: {
		"/bare/": { proxy: "https://tomp.app/" },
		"/bare/**": { proxy: "https://tomp.app/**" },
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: "NuxtProxy - A simple proxy built with nuxt."
        },
      ],
		},
	},
});
