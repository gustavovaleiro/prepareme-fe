import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from '../icons/Icon';
import type { InterviewFeedback, TopicEvaluation } from '../../types/interview';

interface Props {
  feedback: InterviewFeedback;
}

function TopicCard({ evaluation }: { evaluation: TopicEvaluation }) {
  const { t } = useTranslation();
  
  const getUnderstandingColor = (understanding: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      needs_improvement: 'bg-red-100 text-red-800',
    };
    return colors[understanding as keyof typeof colors] || colors.fair;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{evaluation.topic}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUnderstandingColor(evaluation.understanding)}`}>
          {t(`feedback.understanding.${evaluation.understanding}`)}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {evaluation.score}/10
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${evaluation.score * 10}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">{t('feedback.recommendations')}</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {evaluation.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">{t('feedback.studyResources')}</h4>
          <div className="space-y-2">
            {evaluation.studyResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Icon name={resource.type === 'video' ? 'Video' : 'Book'} size={16} />
                {resource.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeedbackDisplay({ feedback }: Props) {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6"
        >
          <Icon name="Award" className="w-10 h-10 text-blue-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('feedback.overallScore')}: {feedback.overallScore}/10
        </h2>
        <p className="text-xl text-gray-600">
          {t('feedback.completionMessage')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <Icon name="TrendingUp" className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('feedback.strengths')}</h3>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                {strength}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <Icon name="AlertCircle" className="w-8 h-8 text-yellow-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('feedback.improvements')}</h3>
          <ul className="space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <Icon name="AlertTriangle" className="w-4 h-4 text-yellow-500 mt-1" />
                {improvement}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <Icon name="BookOpen" className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('feedback.recommendations')}</h3>
          <ul className="space-y-2">
            {feedback.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <Icon name="ArrowRight" className="w-4 h-4 text-blue-500 mt-1" />
                {recommendation}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t('feedback.topicBreakdown')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedback.topicEvaluations.map((evaluation, index) => (
            <TopicCard key={index} evaluation={evaluation} />
          ))}
        </div>
      </div>
    </div>
  );
}