import React from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MeditationPrompt } from '@/components/MeditationPrompt';
import { PhysicalControls } from '@/components/PhysicalControls';
import { Attribution } from '@/components/Attribution';
import { TrackList } from '@/components/TrackList';
import { BackgroundSettings } from '@/components/BackgroundSettings';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTrackBackgrounds } from '@/hooks/useTrackBackgrounds';
import heroBackground from '@/assets/hero-background.jpg';
import bedtimePeaceful from '@/assets/bedtime-peaceful.jpg';
import classicalPianoAmbient from '@/assets/classical-piano-ambient.jpg';
import japaneseGardenKoto from '@/assets/japanese-garden-koto.jpg';
import { musicCollections } from '@/data/tracks';

const Index = () => {
  const [currentCollectionIndex, setCurrentCollectionIndex] = React.useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const { getBackgroundForTrack, loadCachedBackgrounds } = useTrackBackgrounds();
  
  // Load cached backgrounds on mount
  React.useEffect(() => {
    loadCachedBackgrounds();
  }, [loadCachedBackgrounds]);
  
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
    return getBackgroundForTrack(currentTrack.id);
  };

  // Get all tracks for background generation
  const allTracks = React.useMemo(() => {
    return musicCollections.flatMap(collection => collection.tracks);
  }, []);
  return (
    <div 
      className="min-h-screen bg-gradient-background transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 18, 48, 0.90), rgba(15, 13, 38, 0.95)), url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6 py-12 max-w-lg">
        <MeditationPrompt track={musicCollections[currentCollectionIndex].tracks[currentTrackIndex]} />
        
        <div className="space-y-8 mt-12">
          <MusicPlayer 
            currentCollectionIndex={currentCollectionIndex}
            currentTrackIndex={currentTrackIndex}
            onCollectionChange={handleCollectionChange}
            onTrackSelect={handleTrackSelect}
          />
          
          {/* Collection Selector Buttons */}
          <Card className="bg-card/50 border border-border/30 backdrop-blur-xl shadow-card overflow-hidden">
            <div className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground/80 text-center font-medium">Music Collection</p>
              <div className="flex justify-center space-x-3">
                {musicCollections.map((collection, index) => (
                  <Button
                    key={collection.id}
                    variant={currentCollectionIndex === index ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCollectionChange(index)}
                    className={`text-sm px-5 py-2.5 rounded-xl ${
                      currentCollectionIndex === index ? 'shadow-glow' : ''
                    }`}
                  >
                    {collection.name}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/50 text-center font-medium">
                {musicCollections[currentCollectionIndex].tracks.length} tracks available
              </p>
            </div>
          </Card>
          
          <TrackList
            tracks={musicCollections[currentCollectionIndex].tracks}
            currentTrackIndex={currentTrackIndex}
            onTrackSelect={handleTrackSelect}
          />

          <BackgroundSettings allTracks={allTracks} />
          
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
