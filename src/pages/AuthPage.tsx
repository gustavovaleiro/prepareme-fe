import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { InterviewList } from '../components/dashboard/InterviewList';
import { DashboardInterviewFlow } from '../components/dashboard/DashboardInterviewFlow';
import { interviewService } from '../services/interviews';
import type { InterviewSession } from '../types/interview';

export function DashboardPage() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<InterviewSession | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      const response = await interviewService.getUserInterviews();
      if (response.data) {
        setInterviews(response.data);
      }
    } catch (error) {
      console.error('Error loading interviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterviewSelect = (interview: InterviewSession) => {
    setSelectedInterview(interview);
  };

  const handleCreateNew = () => {
    setSelectedInterview(undefined);
  };

  const handleInterviewComplete = () => {
    loadInterviews();
    setSelectedInterview(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedInterview ? (
          <DashboardInterviewFlow
            interview={selectedInterview}
            onComplete={handleInterviewComplete}
          />
        ) : (
          <InterviewList
            interviews={interviews}
            onInterviewSelect={handleInterviewSelect}
            onCreateNew={handleCreateNew}
          />
        )}
      </main>
    </div>
  );
}