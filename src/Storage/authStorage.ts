const TOKEN_KEY = "nova_admin_token";

const isBrowser = typeof window !== "undefined";

export const authStorage = {
  getToken: (): string | null => {
    if (!isBrowser) return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (!isBrowser) return;

    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (!isBrowser) return;

    localStorage.removeItem(TOKEN_KEY);
  },
};
