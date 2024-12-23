import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../icons/Icon';
import type { Question, Answer } from '../../types/interview';

interface Props {
  questions: Question[];
  initialAnswers: Answer[];
  onComplete: (answers: Answer[]) => void;
}

export function QuestionSession({ questions, initialAnswers, onComplete }: Props) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [currentDraft, setCurrentDraft] = useState('');

  // Initialize draft answer from existing answers
  React.useEffect(() => {
    const existingAnswer = answers.find(a => a.questionId === questions[currentIndex].id);
    setCurrentDraft(existingAnswer?.content || '');
  }, [currentIndex, answers, questions]);

  const saveCurrentAnswer = () => {
    if (!currentDraft.trim()) return;

    setAnswers(prev => {
      const newAnswers = [...prev];
      const existingIndex = newAnswers.findIndex(
        a => a.questionId === questions[currentIndex].id
      );
      
      const answer = {
        questionId: questions[currentIndex].id,
        content: currentDraft.trim(),
      };

      if (existingIndex >= 0) {
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers.push(answer);
      }
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    saveCurrentAnswer();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    saveCurrentAnswer();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    saveCurrentAnswer();
    onComplete(answers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-4xl mx-4 bg-white rounded-xl shadow-lg"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-sm text-blue-600 font-medium">
                {t('interview.topic')}: {questions[currentIndex].category}
              </div>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {questions[currentIndex].content}
          </h2>

          <textarea
            value={currentDraft}
            onChange={(e) => setCurrentDraft(e.target.value)}
            className="w-full h-64 p-6 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg"
            placeholder={t('interview.answerPlaceholder')}
          />

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronLeft" size={20} />
              {t('interview.previous')}
            </button>
            <div className="flex items-center text-sm text-gray-500 leading-none">
              {currentIndex + 1} / {questions.length}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentIndex === questions.length - 1
                ? t('interview.finish')
                : t('interview.next')}
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}