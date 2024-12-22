export type InterviewRequest = {
  userId?: string | null;
  userEmail?: string;
  userNumber?: string;
  interviewLanguage?: string;
  role: string;
  level: 'junior' | 'mid' | 'senior';
  language?: string;
};

export type InterviewSession = {
  id: string;
  userId?: string;
  roleId: string;
  level: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  questions: Question[];
};

export type Question = {
  id: string;
  content: string;
  category: string;
  roles: string[];
  keywords: string[];
  language: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Answer = {
  questionId: string;
  content: string;
  duration?: number;
};

export type TopicEvaluation = {
  topic: string;
  score: number;
  understanding: 'excellent' | 'good' | 'fair' | 'needs_improvement';
  recommendations: string[];
  studyResources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'course';
  }[];
};

export type InterviewFeedback = {
  sessionId: string;
  overallScore: number;
  topicEvaluations: TopicEvaluation[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  answers: Array<{
    questionId: string;
    score: number;
    feedback: string;
  }>;
};

export type InterviewFlowState = 'initial' | 'questions' | 'completed';