import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons/Icon';
import type { Question, Answer, Feedback } from '../../../types/interview';

interface Props {
  index: number;
  question: Question;
  answer: Answer;
  feedback: Feedback;
}

export function FeedbackCard({ index, question, answer, feedback }: Props) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Question Header */}
      <div className="bg-gray-50 p-6 border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-gray-900">
              {question.content}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">{feedback.note}</span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="p-6 border-b">
        <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
          <Icon name="MessageSquare" className="w-5 h-5 text-gray-500" />
          {t('feedback.yourAnswer')}
        </h4>
        <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
          {answer.content}
        </div>
      </div>

      {/* Feedback Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Points */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium text-green-700">
            <Icon name="Check" className="w-5 h-5" />
            {t('feedback.positivePoints')}
          </h4>
          <div className="bg-green-50 rounded-lg p-4 text-green-800">
            {feedback.positivePoints}
          </div>
        </div>

        {/* Mistakes */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium text-red-700">
            <Icon name="AlertTriangle" className="w-5 h-5" />
            {t('feedback.mistakes')}
          </h4>
          <div className="bg-red-50 rounded-lg p-4 text-red-800">
            {feedback.mistakes}
          </div>
        </div>

        {/* Code Smells */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium text-orange-700">
            <Icon name="AlertCircle" className="w-5 h-5" />
            {t('feedback.smells')}
          </h4>
          <div className="bg-orange-50 rounded-lg p-4 text-orange-800">
            {feedback.smells}
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium text-blue-700">
            <Icon name="Lightbulb" className="w-5 h-5" />
            {t('feedback.improveSkills')}
          </h4>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800">
            {feedback.improveYourSkillsWith}
          </div>
        </div>
      </div>

      {/* Submission Time */}
      <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500">
        {t('feedback.submittedAt', { 
          date: new Date(answer.submittedAt).toLocaleDateString(),
          time: new Date(answer.submittedAt).toLocaleTimeString()
        })}
      </div>
    </motion.div>
  );
}