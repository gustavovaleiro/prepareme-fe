import { Suspense, lazy, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { preloadCommonIcons } from '../components/icons/preload';

// Lazy load the interview section
const InterviewSection = lazy(() => 
  import('../components/interview/InterviewSection').then(module => ({
    default: module.InterviewSection
  }))
);

// Loading component for the interview section
const InterviewSectionLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export function LandingPage() {
  // Preload common icons when landing page mounts
  useEffect(() => {
    preloadCommonIcons();
  }, []);

  return (
    <div className="snap-container">
      <Header />
      <main>
        <section id="hero" className="min-h-screen snap-section">
          <Hero />
        </section>
        
        <section id="features" className="snap-section">
          <Features />
        </section>
        
        <Suspense fallback={<InterviewSectionLoading />}>
          <section id="interview" className="snap-section">
            <InterviewSection />
          </section>
        </Suspense>
      </main>
    </div>
  );
}