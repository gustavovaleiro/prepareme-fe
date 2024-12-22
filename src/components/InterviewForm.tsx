import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Icon } from './icons/Icon';
import { motion } from 'framer-motion';
import { InterviewSession } from './InterviewSession';
import { Results } from './Results';
import { useRoles } from '../hooks/useRoles';
import type { FormData, Question, Answer } from '../types';

const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Tell me about yourself and your experience.',
    category: 'background',
  },
  {
    id: '2',
    text: 'What are your greatest strengths?',
    category: 'personality',
  },
  {
    id: '3',
    text: 'Where do you see yourself in 5 years?',
    category: 'career',
  },
];

export function InterviewForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [stage, setStage] = useState<'form' | 'interview' | 'results'>('form');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { roles, loading, searchJobRoles } = useRoles();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setStage('interview');
  };

  const handleInterviewComplete = (answers: Answer[]) => {
    setAnswers(answers);
    setStage('results');
  };

  const handleRoleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchJobRoles(e.target.value);
  };

  if (stage === 'interview') {
    return <InterviewSession questions={mockQuestions} onComplete={handleInterviewComplete} />;
  }

  if (stage === 'results') {
    return <Results questions={mockQuestions} answers={answers} />;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your Interview Preparation
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below to begin your personalized interview session
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Icon name="User" className="w-4 h-4 mr-2" />
                      {t('form.name')}
                    </label>
                    <input
                      {...register('name', { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Icon name="Briefcase" className="w-4 h-4 mr-2" />
                      {t('form.role')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Search" className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('role', { required: true })}
                        onChange={handleRoleSearch}
                        list="roles"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={loading ? 'Loading roles...' : 'Search for a role...'}
                      />
                      <datalist id="roles">
                        {roles.map(role => (
                          <option key={role.id} value={role.title} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Icon name="Mail" className="w-4 h-4 mr-2" />
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Icon name="Phone" className="w-4 h-4 mr-2" />
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.level')}
                </label>
                <select
                  {...register('level', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="junior">Junior</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('form.start')}
                <Icon name="Send" className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}