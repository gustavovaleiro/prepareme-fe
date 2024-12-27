export enum InterviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  WAITING_FOR_FEEDBACK = 'waiting_feedback',
  COMPLETED = 'completed'
}

export interface Question {
  id: string;
  content: string;
  category: string;
}

export interface Answer {
  questionId: string;
  content: string;
  submittedAt: Date;
}

export interface Feedback {
  note: number;
  positivePoints: string;
  mistakes: string;
  smells: string;
  improveYourSkillsWith: string;
  generatedAt: Date;
}

export interface InterviewQuestion {
  question: Question;
  userAnswer: Answer | null;
  feedback: Feedback | null;
}

export interface Interview {
  id: string;
  userId?: string;
  userEmail: string;
  userNumber?: string;
  interviewLanguage: string;
  role: string;
  level: string;
  status: InterviewStatus;
  questions: InterviewQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  level: string;
  language: string;
}