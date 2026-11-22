import type { NitroFetchRequest } from 'nitropack'
import type { NitroFetchOptions } from 'nitropack'
import type { FetchOptions } from 'ofetch'

export default async function useApi<T>(path: NitroFetchRequest, opts?: FetchOptions) {
    const route = useRoute()
    const { setParameters, thereAreQueryStrings, queryParams } = useQueryParams()

    const propsToAddToBody: Record<string, unknown> = {}

    if (!isEmpty(route.query)) {
        setParameters(route.query as Record<string, unknown>)
    }

    if (thereAreQueryStrings.value) {
        propsToAddToBody.urlQueryParams = { ...queryParams.value }
    }

    const headers = import.meta.server ? useRequestHeaders() : {}
    const request: NitroFetchOptions<NitroFetchRequest, 'get'> = {
        ...opts,

        headers: {
            ...headers,
            ...opts?.headers,
        },

        body: {
            ...propsToAddToBody,
            ...(opts?.body as Record<string, unknown>),
        },

        async onRequestError({ request, options, error }) {
            console.log(request, options, error)
        },

        async onResponse({ request, response }) {
            console.log('[fetch response]', request, response.status)
        },

        async onResponseError({ request, response }) {
            console.log('[fetch response error]', request, response.status, response.body)
        },
    }

    return $fetch<T>(path, request)
}