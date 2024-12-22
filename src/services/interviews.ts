import { apiClient } from './api/client';
import type { 
  InterviewSession, 
  Answer, 
  InterviewFeedback,
  InterviewRequest 
} from '../types/interview';

export const interviewService = {
  // Create a new interview session
  createSession(data: InterviewRequest) {
    return apiClient.post<InterviewSession>('/api/v1/interviews', data);
  },

  // Submit an answer for a question
  submitAnswer(sessionId: string, answers: Answer[]) {
    return apiClient.post<void>(`/api/v1/interviews/${sessionId}/answers`, answers);
  },

  // Get feedback for completed interview
  getFeedback(sessionId: string) {
    return apiClient.get<InterviewFeedback>(`/api/v1/interviews/${sessionId}/feedback`);
  },
};