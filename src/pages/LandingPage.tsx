import { Suspense } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import React from 'react';
const InterviewFlow = React.lazy(() => import('../components/interview/InterviewFlow'));

export function LandingPage() {
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
        
        <Suspense fallback={<div>Loading...</div>}>
          <section id="interview" className="snap-section">
            <InterviewFlow />
          </section>
        </Suspense>
      </main>
    </div>
  );
}