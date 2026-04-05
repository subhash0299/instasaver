import { motion } from 'framer-motion';
import { Copy, Sparkles, Download } from 'lucide-react';

const steps = [
  {
    icon: Copy,
    title: 'Copy Instagram Link',
    description: 'Find the post, reel, or video you want to download and copy its URL from Instagram',
    number: '01',
  },
  {
    icon: Sparkles,
    title: 'Paste it Here',
    description: 'Paste the copied link into our input field and click the download button',
    number: '02',
  },
  {
    icon: Download,
    title: 'Download Instantly',
    description: 'Your content is ready! Click download and save it directly to your device',
    number: '03',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-zinc-200 max-w-2xl mx-auto">
            Three simple steps to download any Instagram content in seconds
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 opacity-30 -translate-x-6" />
              )}

              <div className="text-center group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative inline-block mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100 dark:border-zinc-600">
                    <span className="text-sm font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-300 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
