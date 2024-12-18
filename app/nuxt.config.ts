// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },

    compatibilityDate: '2024-04-03',

    devtools: {enabled: true},

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    css: [
        '/assets/css/tailwind.css',
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
        }
    },

    modules: [
      '@nuxtjs/google-fonts',
      'nuxt-lodash',
      '@pinia/nuxt',
      'nuxt-utm',
      'nuxt-svgo',
      'nuxt-security',
    ],

    googleFonts: {
        families: {
            Oswald: {
                wght: [300, 500, 700, 800]
            },
            Lato: [100, 300],
            Raleway: {
                wght: [100, 300, 500, 700, 900],
                ital: [100, 300, 500, 700, 900],
            },
        },
        display: 'swap',
        preload: true
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
            crossOriginEmbedderPolicy: false
        }
    }
})
