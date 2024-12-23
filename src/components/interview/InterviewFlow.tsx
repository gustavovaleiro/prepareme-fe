import React, { useState } from 'react';
import { InterviewForm } from './InterviewForm';
import { QuestionSession } from './QuestionSession';
import { FeedbackDisplay } from './FeedbackDisplay';
import { InterviewAuth } from './InterviewAuth';
import { InterviewBuyFeedback } from './InterviewBuyFeedback';
import { interviewService } from '../../services/interviews';
import type { InterviewFlowState, Question, Answer, InterviewFeedback, FormData } from '../../types/interview';
import { useAuth } from '../../contexts/AuthContext';

function InterviewFlow() {
  const [interviewState, setInterviewState] = useState<InterviewFlowState>('initial');
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { user, isAuthenticated } = useAuth();

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    try {
      setIsLoading(true);
      const response = await interviewService.createSession({
        userId: isAuthenticated ? user?.id : null,
        userEmail: data.email,
        userNumber: data.phone,
        interviewLanguage: data.language,
        role: data.role,
        level: data.level,
      });
      
      if (response.data) {
        setSessionId(response.data.id);
        if (response.data.questions) {
          setQuestions(response.data.questions);
          setInterviewState('questions');
        }
      }
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswersComplete = async (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    try {
      setIsLoading(true);
      const response = await interviewService.submitAnswer( sessionId, completedAnswers);
    
      if (!response.error) {
        setInterviewState('completed');
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await interviewService.getFeedback(sessionId);
      if (response.data) {
        setFeedback(response.data);
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyCredits = () => {
    // Will be implemented later
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
      
      {interviewState === 'completed' && !isAuthenticated && (
        <InterviewAuth 
          email={formData?.email}
          phone={formData?.phone}
        />
      )}

      {interviewState === 'completed' && isAuthenticated && !feedback && (
        <InterviewBuyFeedback
          onGenerateFeedback={handleGenerateFeedback}
          onBuyCredits={handleBuyCredits}
          isLoading={isLoading}
        />
      )}

      {interviewState === 'completed' && isAuthenticated && feedback && (
        <FeedbackDisplay feedback={feedback} />
      )}
    </div>
  );
}

export default InterviewFlow;