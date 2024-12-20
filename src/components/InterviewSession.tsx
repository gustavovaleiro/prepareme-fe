import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { useInterviewSession } from '../hooks/useInterviewSession';
import type { Question } from '../types';

type Props = {
  questions: Question[];
  onComplete: (answers: { questionId: string; text: string }[]) => void;
};

export function InterviewSession({ questions, onComplete }: Props) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');
  const { currentQuestion, submitAnswer, isComplete, answers } = useInterviewSession(questions);

  if (isComplete) {
    onComplete(answers);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      submitAnswer(answer.trim());
      setAnswer('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('interview.answerPlaceholder')}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
            {t('interview.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}