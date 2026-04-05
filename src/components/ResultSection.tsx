import { motion } from 'framer-motion';
import { Download, Image as ImageIcon, Video, X } from 'lucide-react';

interface MediaResult {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  username: string;
  caption: string;
}

interface ResultSectionProps {
  result: MediaResult | null;
  onClose: () => void;
}

export function ResultSection({ result, onClose }: ResultSectionProps) {
  if (!result) return null;

  const handleDownload = (url: string, type: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `instasave_${type}_${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                {result.type === 'image' ? (
                  <ImageIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Video className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                )}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Ready to Download
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="relative group overflow-hidden rounded-2xl aspect-square bg-gray-200 dark:bg-gray-700">
                  {result.type === 'image' ? (
                    <img
                      src={result.url}
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={result.thumbnail || result.url}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Video className="w-8 h-8 text-gray-800" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Posted by
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      @{result.username}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Caption
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                      {result.caption || 'No caption'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(result.url, result.type)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download {result.type === 'image' ? 'Image' : 'Video'}
                    </motion.button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Click to save to your device
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
