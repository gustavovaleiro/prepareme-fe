import { useTranslation } from 'react-i18next';
import { Icon } from './icons/Icon';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Português' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
        <Icon name="Globe" size={20} />
        <span>{languages.find(lang => lang.code === i18n.language)?.label || 'Language'}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1" role="menu" aria-orientation="vertical">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="menuitem"
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}