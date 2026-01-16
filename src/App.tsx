import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveDemo } from './components/LiveDemo';
import { Architecture } from './components/Architecture';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

function App() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    // Scroll to demo section
    setTimeout(() => {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-electric-blue/30 selection:text-electric-blue">
      <Navbar />
      <main>
        <Hero onUpload={handleUpload} />
        <LiveDemo videoSrc={videoSrc} />
        <Architecture />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
