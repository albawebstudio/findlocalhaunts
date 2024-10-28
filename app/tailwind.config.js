/** @type {import('tailwindcss').Config} */

const findlocalhaunts = {
    colors: {
        'blaze_orange': {
            DEFAULT: '#FF6F00',
            50: '#FFD7B8',
            100: '#FFCBA3',
            200: '#FFB47A',
            300: '#FF9D52',
            400: '#FF8629',
            500: '#FF6F00',
            600: '#C75700',
            700: '#8F3E00',
            800: '#572600',
            900: '#1F0D00',
            950: '#030100'
        },
        'selective_yellow': {
            DEFAULT: '#FFB300',
            50: '#FFEAB8',
            100: '#FFE4A3',
            200: '#FFD77A',
            300: '#FFCB52',
            400: '#FFBF29',
            500: '#FFB300',
            600: '#C78C00',
            700: '#8F6400',
            800: '#573D00',
            900: '#1F1500',
            950: '#030200'
        },
        'chardonnay': {
            DEFAULT: '#FFCC80',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFDFA',
            300: '#FFEDD2',
            400: '#FFDCA9',
            500: '#FFCC80',
            600: '#FFB548',
            700: '#FF9F10',
            800: '#D78000',
            900: '#9F5F00',
            950: '#834E00'
        },
        bg_light: '#FFF8E1',
        bg_dark: '#3A1C00',
        text_light: '#4D2B00',
        text_dark: '#FFE0B2',
    }
}

const findlocalhaunts2 = {
    colors: {
        'vermilion': {
            DEFAULT: '#FF4500',
            50: '#FFCBB8',
            100: '#FFBCA3',
            200: '#FF9E7A',
            300: '#FF8152',
            400: '#FF6329',
            500: '#FF4500',
            600: '#C73600',
            700: '#8F2700',
            800: '#571700',
            900: '#1F0800',
            950: '#030100'
        },
        'persimmon': {
            DEFAULT: '#FF6347',
            50: '#FFFFFF',
            100: '#FFEDEA',
            200: '#FFCBC1',
            300: '#FFA899',
            400: '#FF8670',
            500: '#FF6347',
            600: '#FF330F',
            700: '#D62100',
            800: '#9E1800',
            900: '#660F00',
            950: '#4A0B00'
        },
        'web_orange': {
            DEFAULT: '#FFA500',
            50: '#FFE6B8',
            100: '#FFDFA3',
            200: '#FFD07A',
            300: '#FFC252',
            400: '#FFB329',
            500: '#FFA500',
            600: '#C78100',
            700: '#8F5C00',
            800: '#573800',
            900: '#1F1400',
            950: '#030200'
        },
        bg_light: '#FFFFFF',
        bg_dark: '#2C1B0E',
        text_light: '#4A2C29',
        text_dark: '#FFE6C4',
    }
}

const findlocalhaunts3 = {
    colors: {
        'trinidad': {
            DEFAULT: '#E65100',
            50: '#FFC19F',
            100: '#FFB38A',
            200: '#FF9961',
            300: '#FF7E39',
            400: '#FF6410',
            500: '#E65100',
            600: '#AE3D00',
            700: '#762900',
            800: '#3E1600',
            900: '#060200',
            950: '#000000'
        },
        'gold_drop': {
            DEFAULT: '#F57C00',
            50: '#FFD7AE',
            100: '#FFCD99',
            200: '#FFB970',
            300: '#FFA448',
            400: '#FF901F',
            500: '#F57C00',
            600: '#BD6000',
            700: '#854300',
            800: '#4D2700',
            900: '#150A00',
            950: '#000000'
        },
        'gorse': {
            DEFAULT: '#FFEB3B',
            50: '#FFFEF3',
            100: '#FFFCDE',
            200: '#FFF7B5',
            300: '#FFF38D',
            400: '#FFEF64',
            500: '#FFEB3B',
            600: '#FFE503',
            700: '#CAB500',
            800: '#928300',
            900: '#5A5000',
            950: '#3E3700'
        },
        bg_light: '#FFFEF3',
        bg_dark: '#281C00',
        text_light: '#3E2723',
        text_dark: '#FFF9C4',
    }
}

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'primary':  findlocalhaunts2.colors.vermilion,
                'secondary':  findlocalhaunts2.colors.persimmon,
                'tertiary':  findlocalhaunts2.colors.web_orange,
                'light':  findlocalhaunts2.colors.bg_light,
                'dark':  findlocalhaunts2.colors.bg_dark,
            },
            backgroundImage: {
                'overlay-dark': 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("/images/bg01.jpg")',
            }
        },
        fontFamily: {
            'body': [
                'Raleway',
                'Lato',
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Oswald',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ],
            'sans': [
                'Raleway',
                'Lato',
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Oswald',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ],
            'another-danger': [
                'Another Danger'
            ],
            'oswald': [
                'Oswald',
            ],
            'supercreep': [
                'Supercreep'
            ],
            'unthinkers': [
                'Unthinkers',
            ],
        }
    },
    plugins: [
        /*require('@tailwindcss/typography'),*/
    ],
}

