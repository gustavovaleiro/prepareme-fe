import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';

interface Props {
  onCreateNew: () => void;
}

export function EmptyState({ onCreateNew }: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <Icon name="Inbox" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t('dashboard.interviews.empty.title')}
      </h3>
      <p className="text-gray-500 mb-6">
        {t('dashboard.interviews.empty.description')}
      </p>
      <button onClick={onCreateNew} className="btn-primary">
        <Icon name="Plus" className="w-5 h-5" />
        {t('dashboard.interviews.createNew')}
      </button>
    </div>
  );
}