import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from '../components/icons/Icon';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function AuthPage() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <Link 
        to="/" 
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Icon name="ArrowLeft" className="w-4 h-4" />
        {t('common.backToHome')}
      </Link>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? t('auth.welcome') : t('auth.createAccount')}
          </h2>
          <div className="mt-4 flex justify-center">
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
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}