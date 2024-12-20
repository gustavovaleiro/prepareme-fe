import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InterviewFlow } from './components/interview/InterviewFlow';
import { NavigationDots } from './components/NavigationDots';

function App() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['hero', 'features', 'interview'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="snap-container">
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta name="twitter:title" content={t('meta.title')} />
        <meta name="twitter:description" content={t('meta.description')} />
      </Helmet>

      <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">Prepare.me</div>
          <LanguageSwitcher />
        </div>
      </header>

      <NavigationDots
        sections={sections}
        activeSection={activeSection}
        onDotClick={scrollToSection}
      />

      <main>
        <section id="hero" className="snap-section">
          <Hero />
        </section>
        
        <section id="features" className="snap-section">
          <Features />
        </section>
        
        <section id="interview" className="snap-section">
          <InterviewFlow />
        </section>
      </main>
    </div>
  );
}

export default App;