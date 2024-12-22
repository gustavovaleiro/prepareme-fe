import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';
import { useAuth } from '../../../contexts/AuthContext';
import { LanguageSwitcher } from '../../LanguageSwitcher';

export default function HeaderActions() {
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
        <Icon 
          name={isAuthenticated ? 'LogOut' : 'LogIn'} 
          className="w-4 h-4" 
        />
        {isAuthenticated ? t('header.signOut') : t('header.signIn')}
      </button>
    </div>
  );
}