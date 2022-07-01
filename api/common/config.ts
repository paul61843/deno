
export const baseHeaders: RequestInit = {
    headers: {
        'Content-Type': 'application/json', 
    }
}

export const GETConfig: RequestInit = {
    ...baseHeaders,
}

export const POSTConfig: RequestInit = {
    ...baseHeaders,
}