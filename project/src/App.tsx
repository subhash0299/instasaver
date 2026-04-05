import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ResultSection } from './components/ResultSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';

interface MediaResult {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  username: string;
  caption: string;
}

const mockResults: Record<string, MediaResult> = {
  image: {
    type: 'image',
    url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    username: 'photography_pro',
    caption: 'Beautiful sunset captured at the golden hour. Nature never ceases to amaze! 🌅',
  },
  video: {
    type: 'video',
    url: 'https://images.pexels.com/photos/4318800/pexels-photo-4318800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/4318800/pexels-photo-4318800.jpeg?auto=compress&cs=tinysrgb&w=800',
    username: 'creative_studio',
    caption: 'Behind the scenes of our latest project. Creating magic one frame at a time! 🎬',
  },
  reel: {
    type: 'video',
    url: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
    username: 'travel_vibes',
    caption: 'Exploring the hidden gems of the city. Adventure awaits! ✨',
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MediaResult | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomType = ['image', 'video', 'reel'][Math.floor(Math.random() * 3)] as keyof typeof mockResults;
    setResult(mockResults[randomType]);
    setIsLoading(false);

    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="relative">
        <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />

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
