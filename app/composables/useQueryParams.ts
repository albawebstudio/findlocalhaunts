export interface QueryParamsState {
    queryParams: Record<string, string>
}

export function useQueryParams() {
    const queryParams = useState<Record<string, string>>('query-params', () => ({}))

    const thereAreQueryStrings = computed(() => !isEmpty(queryParams.value))

    const queryString = computed(() => {
        const query = queryParams.value

        if (isEmpty(query)) {
            return ''
        }

        return (
            '?'
            + Object.keys(query)
                .map((key) => `${key}=${encodeURIComponent(query[key] as string)}`)
                .join('&')
        )
    })

    function setParameters(params: Record<string, unknown>) {
        forOwn(params, (value, key) => {
            queryParams.value[key] = Array.isArray(value) ? value[0] as string : String(value ?? '')
        })
    }

    return {
        queryParams,
        thereAreQueryStrings,
        queryString,
        setParameters,
    }
}