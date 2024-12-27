import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';
import { InterviewStatusBadge } from './InterviewStatusBadge';
import type { Interview } from '../../../types/interview';

interface Props {
  interview: Interview;
  onClick: (interview: Interview) => void;
}

export function InterviewCard({ interview, onClick }: Props) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(interview)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {interview.role}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(interview.createdAt).toLocaleDateString()}
          </p>
        </div>
        <InterviewStatusBadge status={interview.status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Icon name="GraduationCap" className="w-4 h-4" />
          {t(`form.levels.${interview.level}`)}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Icon name="Globe" className="w-4 h-4" />
          {t(`languages.${interview.interviewLanguage}`)}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Icon name="MessageSquare" className="w-4 h-4" />
          {t('dashboard.interviews.questions', { 
            count: interview.questions.length,
            answered: interview.questions.filter(q => q.userAnswer).length 
          })}
        </div>
      </div>
    </motion.div>
  );
}