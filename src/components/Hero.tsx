import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from './icons/Icon';

export function Hero() {
  const { t } = useTranslation();

  const stats = [
    { icon: 'Users', value: '10K+', label: 'Success Stories' },
    { icon: 'Star', value: '98%', label: 'Success Rate' },
    { icon: 'Trophy', value: '150+', label: 'Top Companies' },
  ];

  return (
    <div className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl bottom-20 right-20 animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-100 mb-6">
              <Icon name="Star" className="w-4 h-4 mr-2" />
              <span>Trusted by Industry Leaders</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>

            <motion.a
              href="#features"
              className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta')}
              <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:block"
          >
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm mb-4">
                    <Icon name={stat.icon} className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}