import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Edit2, Check, Save } from 'lucide-react';
import type { Question, Answer } from '../../types/interview';

interface Props {
  questions: Question[];
  answers: Answer[];
  onEdit: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function ReviewAnswers({ questions, answers, onEdit, onSubmit, isLoading = false }: Props) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedAnswers, setEditedAnswers] = useState<Answer[]>(answers);

  const handleAnswerEdit = (questionId: string, newText: string) => {
    setEditedAnswers(prev => 
      prev.map(a => a.questionId === questionId ? { ...a, text: newText } : a)
    );
  };

  const handleSaveEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('review.title')}
            </h2>
            <p className="text-gray-600">
              {t('review.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {questions.map((question, index) => {
              const answer = editedAnswers.find(a => a.questionId === question.id);
              const isEditing = editingId === question.id;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b pb-6 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {index + 1}. {question.text}
                      </h3>
                      <span className="text-sm text-blue-600 font-medium mt-1 block">
                        {question.topic}
                      </span>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setEditingId(question.id)}
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
                        <Edit2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-500 hover:text-green-700 p-2"
                      >
                        <Save size={18} />
                      </button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <textarea
                      value={answer?.text || ''}
                      onChange={(e) => handleAnswerEdit(question.id, e.target.value)}
                      className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {answer?.text}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-between mt-12">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit2 size={20} />
              {t('review.edit')}
            </button>
            
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('common.loading') : t('review.submit')}
              <Check size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}