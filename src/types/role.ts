export type JobRole = {
  id: string;
  title: string;
  categoryId: string;
  description: string;
  requirements: string[];
  level: 'junior' | 'mid' | 'senior';
  active: boolean;
};

export type JobCategory = {
  id: string;
  name: string;
  description: string;
  slug: string;
};