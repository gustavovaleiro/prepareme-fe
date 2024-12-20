import { apiClient } from './api/client';
import type { User, UserProfile, UserStats } from '../types/user';

export const userService = {
  // Register a new user
  register(userData: Partial<User>) {
    return apiClient.post<User>('/users', userData);
  },

  // Get user profile
  getProfile(userId: string) {
    return apiClient.get<UserProfile>(`/users/${userId}/profile`);
  },

  // Update user profile
  updateProfile(userId: string, profileData: Partial<UserProfile>) {
    return apiClient.put<UserProfile>(`/users/${userId}/profile`, profileData);
  },

  // Get user interview statistics
  getStats(userId: string) {
    return apiClient.get<UserStats>(`/users/${userId}/stats`);
  },
};