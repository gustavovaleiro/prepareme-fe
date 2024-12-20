import React, { useState } from 'react';
import { InterviewForm } from './InterviewForm';
import { QuestionSession } from './QuestionSession';
import { ReviewAnswers } from './ReviewAnswers';
import { FeedbackDisplay } from './FeedbackDisplay';
import { interviewService } from '../../services/interviews';
import type { InterviewState, Question, Answer, InterviewFeedback, FormData } from '../../types/interview';

export function InterviewFlow() {
  const [interviewState, setInterviewState] = useState<InterviewState>('initial');
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await interviewService.createSession({
        roleId: formData.role,
        level: formData.level,
      });
      
      if (response.data) {
        setSessionId(response.data.id);
        const questionsResponse = await interviewService.getQuestions(response.data.id);
        if (questionsResponse.data) {
          setQuestions(questionsResponse.data);
          setInterviewState('questions');
        }
      }
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswersComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    setInterviewState('review');
  };

  const handleAnswersEdit = () => {
    setInterviewState('questions');
  };

  const handleSubmitFinal = async () => {
    try {
      setIsLoading(true);
      const response = await interviewService.getFeedback(sessionId);
      if (response.data) {
        setFeedback(response.data);
        setInterviewState('feedback');
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {interviewState === 'initial' && (
        <InterviewForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      )}
      
      {interviewState === 'questions' && (
        <QuestionSession
          questions={questions}
          initialAnswers={answers}
          onComplete={handleAnswersComplete}
        />
      )}
      
      {interviewState === 'review' && (
        <ReviewAnswers
          questions={questions}
          answers={answers}
          onEdit={handleAnswersEdit}
          onSubmit={handleSubmitFinal}
          isLoading={isLoading}
        />
      )}
      
      {interviewState === 'feedback' && feedback && (
        <FeedbackDisplay feedback={feedback} />
      )}
    </div>
  );
}