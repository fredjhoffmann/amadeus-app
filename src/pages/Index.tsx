import React from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MeditationPrompt } from '@/components/MeditationPrompt';
import { PhysicalControls } from '@/components/PhysicalControls';
import { Attribution } from '@/components/Attribution';
import { TrackList } from '@/components/TrackList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const [currentCollectionIndex, setCurrentCollectionIndex] = React.useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  
  // Define collections with actual track data
  const musicCollections = [
    { 
      id: 'western-classical', 
      name: 'Western Classical', 
      tracks: [
        { id: 'clair-de-lune', title: 'Clair de Lune', composer: 'Claude Debussy', duration: '5:03', url: '' },
        { id: 'chopin-nocturne-op9', title: 'Nocturne in E-flat major, Op. 9, No. 2', composer: 'Frédéric Chopin', duration: '4:30', url: '' },
        { id: 'satie-gymnopedie', title: 'Gymnopédie No. 1', composer: 'Erik Satie', duration: '3:33', url: '' },
        { id: 'chopin-nocturne-cs-minor', title: 'Nocturne in C-sharp minor, Op. Posth.', composer: 'Frédéric Chopin', duration: '4:45', url: '' },
        { id: 'debussy-reverie', title: 'Rêverie, L. 68', composer: 'Claude Debussy', duration: '4:20', url: '' },
        { id: 'schumann-traumerei', title: 'Träumerei, Op. 15 No. 7', composer: 'Robert Schumann', duration: '2:30', url: '' },
        { id: 'ravel-pavane', title: 'Pavane pour une infante défunte', composer: 'Maurice Ravel', duration: '6:30', url: '' },
        { id: 'field-nocturne-5', title: 'Nocturne No. 5 in B-flat major', composer: 'John Field', duration: '4:15', url: '' },
        { id: 'liszt-consolation-3', title: 'Consolation No. 3 in D-flat major', composer: 'Franz Liszt', duration: '4:00', url: '' },
        { id: 'beethoven-moonlight', title: 'Moonlight Sonata (1st Movement), Op. 27 No. 2', composer: 'Ludwig van Beethoven', duration: '5:30', url: '' },
        { id: 'mendelssohn-song-without-words', title: 'Song Without Words, Op. 30 No. 6 (Venetian Boat Song)', composer: 'Felix Mendelssohn', duration: '2:45', url: '' }
      ]
    },
    { 
      id: 'worldwide-bedtime', 
      name: 'Worldwide Bedtime', 
      tracks: [
        { id: 'rokudan-no-shirabe', title: 'Rokudan no Shirabe', composer: 'Yatsuhashi Kengyō (Traditional Japanese)', duration: '6:00', url: '' },
        { id: 'high-mountains-flowing-water', title: 'High Mountains and Flowing Water (Gao Shan Liu Shui)', composer: 'Bo Ya (Traditional Chinese)', duration: '5:30', url: '' },
        { id: 'raga-yaman', title: 'Raga Yaman', composer: 'Traditional Indian Classical', duration: '8:00', url: '' },
        { id: 'shur-santur', title: 'Shur (Dastgah-e Shur)', composer: 'Traditional Persian', duration: '6:45', url: '' },
        { id: 'alf-leila-wa-leila', title: 'Alf Leila Wa Leila (One Thousand and One Nights)', composer: 'Traditional Arabic', duration: '5:15', url: '' },
        { id: 'ney-taksimi', title: 'Ney Taksimi (Improvisation)', composer: 'Traditional Turkish', duration: '4:30', url: '' },
        { id: 'arirang', title: 'Arirang', composer: 'Traditional Korean', duration: '4:00', url: '' },
        { id: 'puspanjali', title: 'Puspanjali', composer: 'Traditional Balinese', duration: '7:00', url: '' },
        { id: 'lao-duang-duean', title: 'Lao Duang Duean', composer: 'H.R.H. Prince Benbhadanabhongse (Traditional Thai)', duration: '5:45', url: '' },
        { id: 'ladrang-wilujeng', title: 'Ladrang Wilujeng', composer: 'Traditional Javanese', duration: '6:30', url: '' }
      ]
    }
  ];

  const handleCollectionChange = (index: number) => {
    setCurrentCollectionIndex(index);
    setCurrentTrackIndex(0);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
  };
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
