import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InterviewForm } from '../interview/InterviewForm';
import { QuestionSession } from '../interview/QuestionSession';
import { FeedbackDisplay } from '../interview/feedback/FeedbackDisplay';
import { Icon } from '../icons/Icon';
import { interviewService } from '../../services/interviews';
import { Interview, Answer, InterviewStatus, FormData } from '../../types/interview';

interface Props {
  interview?: Interview;
  onComplete?: () => void;
}

export function DashboardInterviewFlow({ interview, onComplete }: Props) {
  const { t } = useTranslation();
  const [currentInterview, setCurrentInterview] = useState<Interview | undefined>(interview);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentInterview(interview);
  }, [interview]);

  const refreshInterview = async () => {
    if (currentInterview?.id) {
      const response = await interviewService.getInterview(currentInterview.id);
      if (response.data) {
        setCurrentInterview(response.data);
      }
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await interviewService.createSession({
        role: data.role,
        level: data.level,
        interviewLanguage: data.language,
      });
      
      if (response.data) {
        setCurrentInterview(response.data);
        onComplete?.();
      }
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswersComplete = async (completedAnswers: Answer[]) => {
    if (!currentInterview) return;
    
    try {
      setIsLoading(true);
      await interviewService.submitAnswer(currentInterview.id, completedAnswers);
      await refreshInterview();
      onComplete?.();
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentInterview) {
    return <InterviewForm onSubmit={handleFormSubmit} isLoading={isLoading} isAuthenticated />;
  }

  if (currentInterview.status === InterviewStatus.PENDING || currentInterview.status === InterviewStatus.IN_PROGRESS) {
    return (
      <QuestionSession
        questions={currentInterview.questions.map(q => q.question)}
        initialAnswers={currentInterview.questions.map(q => q.userAnswer).filter((a): a is Answer => a !== null)}
        onComplete={handleAnswersComplete}
      />
    );
  }

  if (currentInterview.status === InterviewStatus.WAITING_FOR_FEEDBACK) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Icon name="Clock" className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('interview.waitingFeedback')}
          </h2>
          <p className="text-gray-600">
            {t('interview.waitingFeedbackDescription')}
          </p>
        </div>
      </div>
    );
  }

  return currentInterview.status === InterviewStatus.COMPLETED && (
    <FeedbackDisplay 
      questions={currentInterview.questions.map(q => ({
        question: q.question,
        answer: q.userAnswer!,
        feedback: q.feedback!
      }))} 
    />
  );
}