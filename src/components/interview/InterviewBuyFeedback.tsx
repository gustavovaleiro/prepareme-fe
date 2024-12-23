import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from '../icons/Icon';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  onGenerateFeedback: () => void;
  onBuyCredits: () => void;
  isLoading?: boolean;
}

export function InterviewBuyFeedback({ onGenerateFeedback, onBuyCredits, isLoading = false }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const hasCredits = (user?.profile?.credits ?? 0) > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Icon name="Award" className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('feedback.ready')}
            </h2>
            <p className="text-gray-600">
              {t('feedback.description')}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">{t('feedback.availableCredits')}</span>
              <span className="text-2xl font-bold text-gray-900">
                {user?.profile?.credits ?? 0}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {t('feedback.creditsNeeded', { count: 1 })}
            </div>
          </div>

          {hasCredits ? (
            <button
              onClick={onGenerateFeedback}
              disabled={isLoading}
              className="btn-primary w-full mb-4"
            >
              <Icon name="FileText" className="w-5 h-5" />
              {isLoading ? t('common.loading') : t('feedback.generate')}
            </button>
          ) : (
            <button
              onClick={onBuyCredits}
              className="btn-primary w-full mb-4"
            >
              <Icon name="CreditCard" className="w-5 h-5" />
              {t('feedback.buyCredits')}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}