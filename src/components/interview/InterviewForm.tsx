import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Icon } from '../icons/Icon';
import type { FormData } from '../../types/interview';

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  isAuthenticated?: boolean;
}

export function InterviewForm({ onSubmit, isLoading = false, isAuthenticated = false }: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('form.title')}
          </h2>
          <p className="text-gray-600">
            {t('form.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {!isAuthenticated && (
              <>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    {t('form.name')}
                  </label>
                  <input
                    {...register('name', { required: true })}
                    className="input-field"
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Icon name="Mail" className="w-4 h-4 mr-2" />
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    {...register('email', { required: false })}
                    className="input-field"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Icon name="Phone" className="w-4 h-4 mr-2" />
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder={t('form.phonePlaceholder')}
                  />
                </div>
              </>
            )}

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Icon name="Briefcase" className="w-4 h-4 mr-2" />
                {t('form.role')}
              </label>
              <input
                {...register('role', { required: true })}
                className="input-field"
                placeholder={t('form.rolePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.level')}
              </label>
              <select
                {...register('level', { required: true })}
                className="input-field"
              >
                <option value="junior">{t('form.levels.junior')}</option>
                <option value="mid">{t('form.levels.mid')}</option>
                <option value="senior">{t('form.levels.senior')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.language')}
              </label>
              <select
                {...register('language', { required: true })}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="pt-BR">Português</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? t('common.loading') : t('form.start')}
            <Icon name="ArrowRight" className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}