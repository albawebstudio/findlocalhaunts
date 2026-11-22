export class RecaptchaAction {
    public static readonly login = new RecaptchaAction('login')

    private constructor(public readonly name: string) {}
}

declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void
            execute: (siteKey: string, options: { action: string }) => Promise<string>
        }
    }
}

let loadPromise: Promise<void> | null = null

function loadRecaptchaScript(siteKey: string): Promise<void> {
    if (import.meta.server) {
        return Promise.resolve()
    }

    if (window.grecaptcha) {
        return Promise.resolve()
    }

    if (loadPromise) {
        return loadPromise
    }

    loadPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>('script[data-flh-recaptcha]')
        if (existing) {
            existing.addEventListener('load', () => resolve())
            existing.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')))
            return
        }

        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
        script.async = true
        script.defer = true
        script.dataset.flhRecaptcha = 'true'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
        document.head.appendChild(script)
    })

    return loadPromise
}

/**
 * Execute reCAPTCHA v3 actions and return a token for server verification.
 */
export default function useGoogleRecaptcha() {
    const config = useRuntimeConfig()
    const siteKey = config.public.recaptchaSiteKey as string

    const executeRecaptcha = async (action: RecaptchaAction) => {
        if (import.meta.server) {
            throw new Error('reCAPTCHA can only run in the browser')
        }

        await loadRecaptchaScript(siteKey)

        await new Promise<void>((resolve) => {
            window.grecaptcha!.ready(() => resolve())
        })

        const token = await window.grecaptcha!.execute(siteKey, { action: action.name })
        return { token }
    }

    return { executeRecaptcha }
}