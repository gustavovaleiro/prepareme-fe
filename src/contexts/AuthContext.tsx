import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState, AuthResponse } from '../types/auth';
import { authService } from '../services/auth';

interface AuthContextType extends AuthState {
  login: (response: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // TODO: Validate token and fetch user data
    }
  }, []);

  const login = (response: AuthResponse) => {
    authService.setToken(response.token);
    setAuth({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    authService.removeToken();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};