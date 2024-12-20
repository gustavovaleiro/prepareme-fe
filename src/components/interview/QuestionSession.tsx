import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    const existingIndex = answers.findIndex(
      a => a.questionId === questions[currentIndex].id
    );
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = {
        ...newAnswers[existingIndex],
        text,
      };
    } else {
      newAnswers.push({
        questionId: questions[currentIndex].id,
        text,
      });
    }
    
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === questions[currentIndex].id)?.text || '';
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowConfirm(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
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
              <div className="text-sm text-gray-500 mb-2">
                {t('interview.progress', {
                  current: currentIndex + 1,
                  total: questions.length,
                })}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                {t('interview.topic')}: {questions[currentIndex].topic}
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
            {questions[currentIndex].text}
          </h2>

          <textarea
            value={getCurrentAnswer()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full h-64 p-6 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg"
            placeholder={t('interview.answerPlaceholder')}
          />

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              {t('interview.previous')}
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentIndex === questions.length - 1
                ? t('interview.finish')
                : t('interview.next')}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  {t('interview.confirmation')}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t('interview.confirmationText')}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('common.confirm')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}