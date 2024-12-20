import { apiClient } from './api/client';
import type { 
  InterviewSession, 
  Question, 
  Answer, 
  InterviewFeedback,
  InterviewRequest 
} from '../types/interview';

export const interviewService = {
  // Create a new interview session
  createSession(data: InterviewRequest) {
    return apiClient.post<InterviewSession>('/interviews', data);
  },

  // Get questions for an interview session
  getQuestions(sessionId: string) {
    return apiClient.get<Question[]>(`/interviews/${sessionId}/questions`);
  },

  // Submit an answer for a question
  submitAnswer(sessionId: string, questionId: string, answer: Answer) {
    return apiClient.post<void>(`/interviews/${sessionId}/questions/${questionId}/answers`, answer);
  },

  // Get feedback for completed interview
  getFeedback(sessionId: string) {
    return apiClient.get<InterviewFeedback>(`/interviews/${sessionId}/feedback`);
  },
};