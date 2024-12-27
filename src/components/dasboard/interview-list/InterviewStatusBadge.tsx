import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';
import type { InterviewStatus } from '../../../types/interview';

interface Props {
  status: InterviewStatus;
}

export function InterviewStatusBadge({ status }: Props) {
  const { t } = useTranslation();

  const statusConfig = {
    [InterviewStatus.PENDING]: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: 'Clock'
    },
    [InterviewStatus.IN_PROGRESS]: {
      color: 'bg-blue-100 text-blue-800',
      icon: 'Play'
    },
    [InterviewStatus.WAITING_FOR_FEEDBACK]: {
      color: 'bg-purple-100 text-purple-800',
      icon: 'HourglassIcon'
    },
    [InterviewStatus.COMPLETED]: {
      color: 'bg-green-100 text-green-800',
      icon: 'CheckCircle'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      <Icon name={config.icon} className="w-4 h-4" />
      {t(`interview.status.${status}`)}
    </span>
  );
}