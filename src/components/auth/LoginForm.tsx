import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import type { LoginRequest } from '../../types/auth';

export function LoginForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      if (response.data) {
        login(response.data);
        navigate('/dashboard');
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError(t('auth.errors.login'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 mr-2" />
          {t('auth.email')}
        </label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="input-field"
          placeholder={t('auth.emailPlaceholder')}
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Lock className="w-4 h-4 mr-2" />
          {t('auth.password')}
        </label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="input-field"
          placeholder={t('auth.passwordPlaceholder')}
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {t('auth.signIn')}
      </button>
    </form>
  );
}