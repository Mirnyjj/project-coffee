export const request = (url: string, method?: string, data?: unknown) => {
    return fetch(url, {
        headers: {
            'content-type': 'application/json'
        },
        method: method || 'GET',
        body: data ? JSON.stringify(data) : undefined,
    }).then(res => {
        return res.json()
    })
}