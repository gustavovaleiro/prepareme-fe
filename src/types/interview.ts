export type InterviewRequest = {
  userId?: string;
  roleId: string;
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
};

export type Question = {
  id: string;
  sessionId: string;
  text: string;
  category: string;
  order: number;
  timeLimit?: number;
  topic: string;
};

export type Answer = {
  questionId: string;
  text: string;
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

export type InterviewState = 'initial' | 'questions' | 'review' | 'feedback';