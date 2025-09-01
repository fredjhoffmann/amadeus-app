import React from 'react';
import { Header } from '@/components/Header';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MeditationPrompt } from '@/components/MeditationPrompt';
import { Attribution } from '@/components/Attribution';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const [musicPlayerRef, setMusicPlayerRef] = React.useState<{ togglePlayPause: () => void } | null>(null);
  return (
    <div 
      className="min-h-screen bg-gradient-background"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 31, 70, 0.85), rgba(26, 23, 61, 0.95)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Header />
        
        <div className="space-y-6">
          <MusicPlayer />
          <MeditationPrompt />
          <PhysicalControls 
            onActionButtonPress={() => {
              // This will be handled by the MusicPlayer component's event listeners
              const event = new CustomEvent('actionbutton');
              window.dispatchEvent(event);
            }}
          />
        </div>
        
        <Attribution />
        
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/40 font-serif">
            Designed for peaceful nights and sweet dreams
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
