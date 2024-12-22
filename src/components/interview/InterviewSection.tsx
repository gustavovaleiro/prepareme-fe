import { lazy, Suspense } from 'react';

const InterviewFlow = lazy(() => 
  import('./InterviewFlow').then(module => ({
    default: module.default
  }))
);

export function InterviewSection() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <InterviewFlow />
    </Suspense>
  );
}