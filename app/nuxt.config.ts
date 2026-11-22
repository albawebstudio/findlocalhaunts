// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
    },

    compatibilityDate: '2024-04-03',

    devtools: { enabled: true },

    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    runtimeConfig: {
        newsletterApiKey: process.env.BEEHIIV_API_KEY,
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
        public: {
            beehiivApiUrl: process.env.BEEHIIV_API_URL,
            publicationId: process.env.BEEHIIV_PUBLICATION_ID,
            apiUrl: process.env.FLH_API_URL,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        },
    },

    modules: [
        '@nuxt/ui',
        'nuxt-utm',
        'nuxt-svgo',
        'nuxt-security',
    ],

    imports: {
        presets: [
            {
                from: 'lodash-es',
                imports: ['isEmpty', 'forOwn'],
            },
        ],
    },

    // @nuxt/fonts (bundled with @nuxt/ui) replaces @nuxtjs/google-fonts
    fonts: {
        defaults: {
            styles: ['normal'],
        },
        families: [
            {
                name: 'Oswald',
                provider: 'google',
                weights: [300, 500, 700, 800],
            },
            {
                name: 'Lato',
                provider: 'google',
                weights: [100, 300],
            },
            {
                name: 'Raleway',
                provider: 'google',
                weights: [100, 300, 500, 700, 900],
                styles: ['normal', 'italic'],
            },
        ],
    },

    nitro: {
        // cloudflare-pages: prerendered HTML + Pages Functions for /api/*
        // Use NITRO_PRESET=static + `nuxt generate` only if APIs move off-site
        preset: process.env.NITRO_PRESET || 'cloudflare-pages',
    },

    routeRules: {
        '/': { prerender: true },
        '/terms': { prerender: true },
        '/privacy': { prerender: true },
    },

    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },

    security: {
        headers: {
            crossOriginResourcePolicy: 'cross-origin',
            crossOriginOpenerPolicy: 'same-origin',
            crossOriginEmbedderPolicy: false,
        },
    },
})