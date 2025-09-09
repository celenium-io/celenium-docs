export default defineNuxtConfig({
	modules: ["@nuxt/content", "nuxt-simple-sitemap", "@pinia/nuxt", "nuxt-og-image"],

	sitemap: {
		xsl: false,
	},

	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
				{
					name: "lang",
					content: "en",
				},
			],
			link: [
				{
					id: "favicon",
					rel: "icon",
					type: "image/png",
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous",
				},
				{
					rel: "preload",
					as: "style",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
					onload: "this.onload=null;this.rel='stylesheet'",
				},
			],
		},
	},

	css: ["@/assets/styles/base.scss", "@/assets/styles/flex.scss", "@/assets/styles/text.scss"],

	content: {
		build: {
			markdown: {
				remarkPlugins: {
					"remark-math": {},
				},
				rehypePlugins: {
					"rehype-mathjax": {},
				},
			},
		},
		documentDriven: true,
		navigation: {
			fields: ["icon", "name"],
		},
	},

	devtools: { enabled: true },
})
