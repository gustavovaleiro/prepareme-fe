export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  userId: string;
  phone?: string;
  currentRole?: string;
  targetRole?: string;
  experience: number;
  preferredLanguage: string;
  notifications: boolean;
};

export type UserStats = {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  topStrengths: string[];
  areasToImprove: string[];
  lastSessionDate?: string;
};