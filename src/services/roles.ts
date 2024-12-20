import { apiClient } from './api/client';
import type { JobRole, JobCategory } from '../types/role';

export const roleService = {
  // Get all job roles
  getRoles() {
    return apiClient.get<JobRole[]>('/roles');
  },

  // Get job role by ID
  getRole(id: string) {
    return apiClient.get<JobRole>(`/roles/${id}`);
  },

  // Get all job categories
  getCategories() {
    return apiClient.get<JobCategory[]>('/categories');
  },

  // Search roles
  searchRoles(query: string) {
    return apiClient.get<JobRole[]>('/roles/search', { q: query });
  },
};