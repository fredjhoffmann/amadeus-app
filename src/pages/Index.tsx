import React from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MeditationPrompt } from '@/components/MeditationPrompt';
import { PhysicalControls } from '@/components/PhysicalControls';
import { Attribution } from '@/components/Attribution';
import { TrackList } from '@/components/TrackList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroBackground from '@/assets/hero-background.jpg';
import bedtimePeaceful from '@/assets/bedtime-peaceful.jpg';
import classicalPianoAmbient from '@/assets/classical-piano-ambient.jpg';
import japaneseGardenKoto from '@/assets/japanese-garden-koto.jpg';
import { musicCollections } from '@/data/tracks';

const Index = () => {
  const [currentCollectionIndex, setCurrentCollectionIndex] = React.useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  
  const handleCollectionChange = (index: number) => {
    setCurrentCollectionIndex(index);
    setCurrentTrackIndex(0);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
  };

  // Get reactive background image based on current track
  const getBackgroundImage = () => {
    const currentTrack = musicCollections[currentCollectionIndex].tracks[currentTrackIndex];
    
    // Map specific tracks to themed backgrounds
    if (currentTrack?.id?.includes('koto') || currentTrack?.composer?.includes('Japanese')) {
      return japaneseGardenKoto;
    } else if (currentCollectionIndex === 0) { // Western Bedtime collection
      return classicalPianoAmbient;
    } else {
      return bedtimePeaceful;
    }
  };
  return (
    <div 
      className="min-h-screen bg-gradient-background transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 31, 70, 0.85), rgba(26, 23, 61, 0.95)), url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-md">
        <MeditationPrompt track={musicCollections[currentCollectionIndex].tracks[currentTrackIndex]} />
        
        <div className="space-y-6 mt-8">
          <MusicPlayer 
            currentCollectionIndex={currentCollectionIndex}
            currentTrackIndex={currentTrackIndex}
            onCollectionChange={handleCollectionChange}
            onTrackSelect={handleTrackSelect}
          />
          
          {/* Collection Selector Buttons */}
          <Card className="bg-card/20 border border-border/10 backdrop-blur-sm">
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground text-center">Music Collection</p>
              <div className="flex justify-center space-x-3">
                {musicCollections.map((collection, index) => (
                  <Button
                    key={collection.id}
                    variant={currentCollectionIndex === index ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCollectionChange(index)}
                    className="text-sm px-4 py-2"
                  >
                    {collection.name}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 text-center">
                {musicCollections[currentCollectionIndex].tracks.length} tracks available
              </p>
            </div>
          </Card>
          
          <TrackList
            tracks={musicCollections[currentCollectionIndex].tracks}
            currentTrackIndex={currentTrackIndex}
            onTrackSelect={handleTrackSelect}
          />
          
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
