import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { HeaderSkeleton } from './HeaderSkeleton';

// Lazy load non-critical components
const HeaderActions = lazy(() => import('./HeaderActions'));

export function Header() {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <Suspense fallback={<HeaderSkeleton />}>
          <HeaderActions />
        </Suspense>
      </div>
    </header>
  );
}