import { apiClient } from './api/client';
import type { Interview, Answer } from '../types/interview';

interface CreateInterviewRequest {
  role: string;
  level: string;
  interviewLanguage: string;
}

export const interviewService = {
  createSession(data: CreateInterviewRequest) {
    return apiClient.post<Interview>('/api/v1/interviews', data);
  },

  getUserInterviews() {
    return apiClient.get<Interview[]>('/api/v1/interviews');
  },

  submitAnswer(interviewId: string, answers: Answer[]) {
    return apiClient.post<void>(`/api/v1/interviews/${interviewId}/answers`, { answers });
  },

  getInterview(interviewId: string) {
    return apiClient.get<Interview>(`/api/v1/interviews/${interviewId}`);
  },
};