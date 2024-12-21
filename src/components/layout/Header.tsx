import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Prepare.me
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <span className="text-gray-600">
              {t('header.welcome', { name: user?.name })}
            </span>
          )}
          <LanguageSwitcher />
          <button
            onClick={handleAuthClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-4 h-4" />
                {t('header.signOut')}
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                {t('header.signIn')}
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}