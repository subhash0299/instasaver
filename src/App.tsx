import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ResultSection } from './components/ResultSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';
import { fetchInstagramMedia } from './lib/fetchInstagramMedia';

export interface MediaResult {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  username: string;
  caption: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setResult(null);
    setFetchError(null);

    try {
      const media = await fetchInstagramMedia(url);
      setResult(media);
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setFetchError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-slate-950 dark:via-[#1a1025] dark:to-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 dark:opacity-[0.15]" />

      <div className="relative">
        <HeroSection
          onSubmit={handleSubmit}
          isLoading={isLoading}
          fetchError={fetchError}
          onClearFetchError={() => setFetchError(null)}
        />

        <div id="result-section">
          <ResultSection result={result} onClose={handleCloseResult} />
        </div>

        {!result && (
          <>
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
