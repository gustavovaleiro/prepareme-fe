import { apiClient } from './api/client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const authService = {
  async login(data: LoginRequest) {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  async register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },
};