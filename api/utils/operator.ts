// fetch config
type Config = {
    headers: Headers,
    method: string,
    body: string | {},
}

export const method = (method: string) => (config: Config) => ({
    ...config,
    method,
})

export const headers = (headers: string) => (config: Config) => ({
    ...config,
    headers,
})
