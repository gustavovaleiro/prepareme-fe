import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';

interface Props {
  interviewCount: number;
  onCreateNew: () => void;
}

export function ListHeader({ interviewCount, onCreateNew }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('dashboard.interviews.title')}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {t('dashboard.interviews.subtitle', { count: interviewCount })}
        </p>
      </div>
      <button onClick={onCreateNew} className="btn-primary">
        <Icon name="Plus" className="w-5 h-5" />
        {t('dashboard.interviews.createNew')}
      </button>
    </div>
  );
}