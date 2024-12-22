import React, { useState } from 'react';
import { InterviewForm } from './InterviewForm';
import { QuestionSession } from './QuestionSession';
import { FeedbackDisplay } from './FeedbackDisplay';
import { interviewService } from '../../services/interviews';
import type { InterviewFlowState, Question, Answer, InterviewFeedback, FormData } from '../../types/interview';
import { useAuth } from '../../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

function InterviewFlow() {
  const [interviewState, setInterviewState] = useState<InterviewFlowState>('initial');
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {user, isAuthenticated} = useAuth();

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await interviewService.createSession({
        userId: isAuthenticated ? user?.id : null ,
        userEmail: formData.email,
        userNumber: formData.phone,
        interviewLanguage: formData.language,
        role: formData.role,
        level: formData.level,
      });
      
      if (response.data) {
        setSessionId(response.data.id);
        if (response.data.questions ) {
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
      const response = await interviewService.submitAnswer( sessionId, answers);
    
      if (response.data) {
        setFeedback(response.data.feedback);
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
      
      {interviewState === 'completed' && !isAuthenticated  && (
        <InterviewAuth />
      )}
      {interviewState === 'completed' && !feedback  && (
        <InterviewBuyFeedback />
      )}
      {interviewState === 'completed' && isAuthenticated && feedback && (
        <FeedbackDisplay feedback={feedback} />
      )}
    </div>
  );

}
export default InterviewFlow;
