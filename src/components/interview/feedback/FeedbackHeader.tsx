import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';

interface Props {
  averageNote: number;
  totalQuestions: number;
}

export function FeedbackHeader({ averageNote, totalQuestions }: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6"
      >
        <Icon name="Award" className="w-10 h-10 text-blue-600" />
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {t('feedback.overallScore')}: {averageNote.toFixed(1)}/10
      </h2>
      <p className="text-lg text-gray-600">
        {t('feedback.totalQuestions', { count: totalQuestions })}
      </p>
    </div>
  );
}