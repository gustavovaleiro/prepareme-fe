// Existing types...
export type JobRole = {
  id: string;
  title: string;
  category: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type Language = 'portugues' | 'english' | 'espanol';

export type Question = {
  id: string;
  text: string;
  category: string;
};

export type Answer = {
  questionId: string;
  text: string;
};

export type FormData = {
  name: string;
  role: string;
  level: InterviewLevel;
  email: string;
  language: Language;
};

export type InterviewSession = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
};