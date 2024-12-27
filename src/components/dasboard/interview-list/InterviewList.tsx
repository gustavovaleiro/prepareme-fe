import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListHeader } from './ListHeader';
import { InterviewCard } from './InterviewCard';
import { EmptyState } from './EmptyState';
import { InterviewListSkeleton } from './InterviewListSkeleton';
import type { Interview } from '../../../types/interview';

interface Props {
  interviews: Interview[];
  onInterviewSelect: (interview: Interview) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

export function InterviewList({ 
  interviews, 
  onInterviewSelect, 
  onCreateNew, 
  isLoading = false 
}: Props) {
  const { t } = useTranslation();

  if (isLoading) {
    return <InterviewListSkeleton />;
  }

  if (interviews.length === 0) {
    return <EmptyState onCreateNew={onCreateNew} />;
  }

  return (
    <div className="space-y-6">
      <ListHeader 
        interviewCount={interviews.length} 
        onCreateNew={onCreateNew} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onClick={onInterviewSelect}
          />
        ))}
      </div>
    </div>
  );
}