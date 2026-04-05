import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Gift } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Downloads',
    description: 'Get your content in seconds with our lightning-fast download engine',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'No Login Required',
    description: 'Download Instagram content without signing in or sharing your credentials',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Fully responsive design works seamlessly on mobile, tablet, and desktop',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gift,
    title: 'Free to Use',
    description: 'Completely free service with no hidden fees or premium subscriptions',
    color: 'from-purple-500 to-pink-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Why Choose InstaSave Pro?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the fastest and most reliable Instagram downloader with premium features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
