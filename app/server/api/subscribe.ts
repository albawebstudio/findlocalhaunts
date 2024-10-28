export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const baseUrl: string =  useRuntimeConfig().public.beehiivApiUrl
    const publicationId: string =  useRuntimeConfig().public.publicationId
    const apiRoute: string = `publications/${publicationId}/subscriptions`
    const body = await readBody(event)

    return await $fetch(baseUrl + apiRoute, {
        method: 'POST',
        headers: {'Authorization': config.newsletterApiKey ?? ''},
        body: body,
    })
})
