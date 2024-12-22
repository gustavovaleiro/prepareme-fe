import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Lazy load pages with proper loading fallback
const LandingPage = React.lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const AuthPage = React.lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Helmet>
          <html lang={i18n.language} />
          <title>{t('meta.title')}</title>
          <meta name="description" content={t('meta.description')} />
        </Helmet>

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}