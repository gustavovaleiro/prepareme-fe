import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Briefcase, Languages, Mail, Phone, User } from 'lucide-react';
import type { FormData } from '../../types/interview';
import { useEffect } from 'react';

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function InterviewForm({ onSubmit, isLoading = false }: Props) {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  // Atualizando o valor do campo de idioma após a montagem do componente
  useEffect(() => {
    setValue('language', i18n.language);
  }, [i18n.language, setValue]);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Português' },
    { code: 'es', label: 'Español' }
  ];
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
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                {t('form.name')}
              </label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                {t('form.email')}
              </label>
              <input
                type="email"
                {...register('email', { required: false })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 mr-2" />
                {t('form.role')}
              </label>
              <input
                {...register('role', { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                {t('form.phone')}
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.level')}
              </label>
              <select
                {...register('level', { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? t('common.loading') : t('form.start')}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}