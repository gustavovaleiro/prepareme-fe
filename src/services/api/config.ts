export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.prepare.me/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};