import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardPaste, Download, Loader2, X } from 'lucide-react';

interface HeroSectionProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  fetchError?: string | null;
  onClearFetchError?: () => void;
}

export function HeroSection({ onSubmit, isLoading, fetchError, onClearFetchError }: HeroSectionProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateInstagramUrl = (url: string): boolean => {
    const instagramRegex = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv)\/[\w-]+\/?/i;
    return instagramRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter an Instagram URL');
      return;
    }

    if (!validateInstagramUrl(url)) {
      setError('Please enter a valid Instagram post, reel, or video URL');
      return;
    }

    onSubmit(url);
  };

  const clearUrl = () => {
    setUrl('');
    setError('');
    onClearFetchError?.();
  };

  const pasteFromClipboard = async () => {
    setError('');
    onClearFetchError?.();
    try {
      if (!navigator.clipboard?.readText) {
        setError('Clipboard is not available in this browser. Use Ctrl+V (or ⌘+V) in the field.');
        return;
      }
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) {
        setError('Clipboard is empty. Copy an Instagram link first.');
        return;
      }
      setUrl(text);
    } catch {
      setError('Could not read clipboard. Allow paste permission or paste manually (Ctrl+V).');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg"
          >
            <Download className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
            Download Instagram Posts Instantly
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-200 mb-12 max-w-2xl mx-auto">
            Paste your Instagram link and download photos, videos, and reels in seconds.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-2 md:p-2.5 bg-white/85 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-black/50 border border-gray-200/60 dark:border-zinc-600/70 dark:ring-1 dark:ring-white/10">
                <div className="relative flex flex-1 items-center min-w-0 rounded-xl dark:bg-zinc-950/50">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError('');
                      onClearFetchError?.();
                    }}
                    placeholder="Paste Instagram URL here..."
                    className={`w-full py-4 bg-transparent text-gray-900 dark:text-zinc-50 placeholder:text-gray-400 dark:placeholder:text-zinc-400 outline-none text-lg rounded-xl pl-6 ${url.trim() && !isLoading ? 'pr-12' : 'pr-6'}`}
                    disabled={isLoading}
                  />
                  {url.trim() && !isLoading && (
                    <button
                      type="button"
                      onClick={clearUrl}
                      className="absolute right-2 p-2 rounded-lg text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200/80 dark:hover:bg-zinc-700 transition-colors"
                      aria-label="Clear URL"
                      title="Clear"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-row gap-2 md:gap-3 shrink-0">
                  <motion.button
                    type="button"
                    disabled={isLoading}
                    onClick={pasteFromClipboard}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="flex-1 md:flex-none px-5 py-4 rounded-xl font-semibold border-2 border-gray-300 dark:border-zinc-500 text-gray-700 dark:text-zinc-100 bg-white/60 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:border-gray-400 dark:hover:border-zinc-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-0 md:min-w-[120px]"
                    aria-label="Paste from clipboard"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="w-5 h-5 shrink-0" />
                    <span className="truncate">Paste</span>
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 md:flex-none px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg dark:shadow-purple-900/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {(error || fetchError) && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm font-medium text-red-600 dark:text-rose-300 dark:drop-shadow-[0_0_12px_rgba(251,113,133,0.25)]"
              >
                {error || fetchError}
              </motion.p>
            )}
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-gray-500 dark:text-zinc-300"
          >
            Example:{' '}
            <span className="font-mono text-[0.8125rem] sm:text-sm text-gray-600 dark:text-zinc-200 break-all">
              https://www.instagram.com/p/ABC123xyz/
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
