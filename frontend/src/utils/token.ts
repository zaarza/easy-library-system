export const TOKEN_NAME: string = 'token';

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_NAME);
};

export const putToken = (token: string) => {
    localStorage.setItem(TOKEN_NAME, token);
};

export const deleteToken = (): void => {
    localStorage.removeItem(TOKEN_NAME);
};
