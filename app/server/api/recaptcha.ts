export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const apiRoute: string = 'https://www.google.com/recaptcha/api/siteverify'
    const body = await readBody(event)

    body.secret = runtimeConfig.recaptchaSecretKey;
    console.log(`body:`, body)
    return await $fetch(apiRoute, {
        method: 'POST',
        body,
    })
})
