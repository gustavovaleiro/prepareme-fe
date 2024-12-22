import { useTranslation } from 'react-i18next';
import { Icon } from './icons/Icon';
import type { Question, Answer } from '../types';

type Props = {
  questions: Question[];
  answers: Answer[];
};

export function Results({ questions, answers }: Props) {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Icon name="CheckCircle" className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t('results.completed')}</h2>
        <p className="text-gray-600">{t('results.feedback')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">{t('results.summary')}</h3>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="border-b pb-4 last:border-b-0">
              <p className="font-medium mb-2">
                {index + 1}. {question.text}
              </p>
              <p className="text-gray-600">
                {answers.find((a) => a.questionId === question.id)?.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Icon name="Download" size={20} />
          {t('results.download')}
        </button>
      </div>
    </div>
  );
}