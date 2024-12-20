import { useState, useEffect } from 'react';
import { roleService } from '../services/roles';
import type { JobRole } from '../types/role';

export function useRoles() {
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    try {
      setLoading(true);
      const response = await roleService.getRoles();
      if (response.data) {
        setRoles(response.data);
        setError(null);
      } else if (response.error) {
        setError(new Error(response.error.message));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function searchJobRoles(query: string) {
    if (!query.trim()) {
      return loadRoles();
    }

    try {
      setLoading(true);
      const response = await roleService.searchRoles(query);
      if (response.data) {
        setRoles(response.data);
        setError(null);
      } else if (response.error) {
        setError(new Error(response.error.message));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { roles, loading, error, searchJobRoles, refreshRoles: loadRoles };
}