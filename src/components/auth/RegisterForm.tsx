import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons/Icon';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import type { RegisterRequest } from '../../types/auth';

export function RegisterForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      if (response.data) {
        login(response.data);
        navigate('/dashboard');
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError(t('auth.errors.register'));
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
          <Icon name="User" className="w-4 h-4 mr-2" />
          {t('auth.fullName')}
        </label>
        <input
          {...register('name', { required: true })}
          className="input-field"
          placeholder={t('auth.namePlaceholder')}
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Icon name="Mail" className="w-4 h-4 mr-2" />
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
          <Icon name="Lock" className="w-4 h-4 mr-2" />
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
        {t('auth.signUp')}
      </button>
    </form>
  );
}