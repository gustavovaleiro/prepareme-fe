import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from './icons/Icon';
import type { IconName } from './icons/Icon';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
  details: string;
}

export function Features() {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      icon: 'Target',
      title: t('features.personalized'),
      description: t('features.personalizedDesc'),
      details: t('features.personalizedDetails'),
    },
    {
      icon: 'MessageSquare',
      title: t('features.feedback'),
      description: t('features.feedbackDesc'),
      details: t('features.feedbackDetails'),
    },
    {
      icon: 'BookOpen',
      title: t('features.resources'),
      description: t('features.resourcesDesc'),
      details: t('features.resourcesDetails'),
    },
    {
      icon: 'Award',
      title: t('features.expertise'),
      description: t('features.expertiseDesc'),
      details: t('features.expertiseDetails'),
    },
    {
      icon: 'Users',
      title: t('features.community'),
      description: t('features.communityDesc'),
      details: t('features.communityDetails'),
    },
    {
      icon: 'TrendingUp',
      title: t('features.success'),
      description: t('features.successDesc'),
      details: t('features.successDetails'),
    },
  ];

  return (
    <section 
      id="features" 
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      aria-label={t('features.title')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <Icon 
                  name={feature.icon}
                  className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 group-hover:opacity-0 transition-opacity duration-300">
                  {feature.description}
                </p>
                <div className="absolute inset-0 p-8 bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
                  <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-blue-100">{feature.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}