export const baseHeaders: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const GETConfig: RequestInit = {
  ...baseHeaders,
};

export const POSTConfig: RequestInit = {
  ...baseHeaders,
};

export const dataBasePostConfig: RequestInit = {
  headers: {
    ...baseHeaders.headers,
    "Access-Control-Request-Headers": "*",
    "api-key":
      "kgY8k1DKHTYfZG2zW7T6Zdjcs7Q0IG5UHYNV0bQHY8SofViEL4EEdFEYBDwX3me1",
  },
};
