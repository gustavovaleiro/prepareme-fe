import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from '../icons/Icon';
import { LoginForm } from '../auth/LoginForm';
import { RegisterForm } from '../auth/RegisterForm';

interface Props {
  email?: string;
  phone?: string;
}

export function InterviewAuth({ email, phone }: Props) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Icon name="Lock" className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('interviewAuth.title')}
          </h2>
          <p className="text-gray-600">
            {t('interviewAuth.subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  !isLogin
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t('auth.signUp')}
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isLogin
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t('auth.signIn')}
              </button>
            </div>
          </div>

          {isLogin ? (
            <LoginForm initialEmail={email} />
          ) : (
            <RegisterForm initialEmail={email} initialPhone={phone} />
          )}
        </div>
      </motion.div>
    </div>
  );
}