import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrackList } from '@/components/TrackList';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  composer: string;
  duration: string;
  url: string;
}

const classicalTracks: Track[] = [
  // Chopin Nocturnes
  {
    id: '1',
    title: 'Nocturne in E-flat major, Op. 9, No. 2',
    composer: 'Frédéric Chopin',
    duration: '4:30',
    url: '/audio/chopin-nocturne-op9-no2.mp3'
  },
  {
    id: '2',
    title: 'Nocturne in B-flat minor, Op. 9, No. 1',
    composer: 'Frédéric Chopin',
    duration: '5:37',
    url: '/audio/chopin-nocturne-op9-no1.mp3'
  },
  {
    id: '3',
    title: 'Nocturne in B major, Op. 9, No. 3',
    composer: 'Frédéric Chopin',
    duration: '6:54',
    url: '/audio/chopin-nocturne-op9-no3.mp3'
  },
  {
    id: '4',
    title: 'Nocturne in F major, Op. 15, No. 1',
    composer: 'Frédéric Chopin',
    duration: '4:48',
    url: '/audio/chopin-nocturne-op15-no1.mp3'
  },
  {
    id: '5',
    title: 'Nocturne in F-sharp major, Op. 15, No. 2',
    composer: 'Frédéric Chopin',
    duration: '3:32',
    url: '/audio/chopin-nocturne-op15-no2.mp3'
  },
  {
    id: '6',
    title: 'Nocturne in G minor, Op. 15, No. 3',
    composer: 'Frédéric Chopin',
    duration: '4:04',
    url: '/audio/chopin-nocturne-op15-no3.mp3'
  },
  {
    id: '7',
    title: 'Nocturne in C-sharp minor, Op. 27, No. 1',
    composer: 'Frédéric Chopin',
    duration: '4:47',
    url: '/audio/chopin-nocturne-op27-no1.mp3'
  },
  {
    id: '8',
    title: 'Nocturne in D-flat major, Op. 27, No. 2',
    composer: 'Frédéric Chopin',
    duration: '5:41',
    url: '/audio/chopin-nocturne-op27-no2.mp3'
  },
  
  // Debussy
  {
    id: '9',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    duration: '5:03',
    url: '/audio/debussy-clair-de-lune.mp3'
  },
  {
    id: '10',
    title: 'Rêverie',
    composer: 'Claude Debussy',
    duration: '4:18',
    url: '/audio/debussy-reverie.mp3'
  },
  {
    id: '11',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    duration: '3:33',
    url: '/audio/satie-gymnopedie-1.mp3'
  },
  {
    id: '12',
    title: 'Gymnopédie No. 3',
    composer: 'Erik Satie',
    duration: '2:48',
    url: '/audio/satie-gymnopedie-3.mp3'
  },
  
  // Bach Goldberg Variations (Selection)
  {
    id: '13',
    title: 'Goldberg Variations, BWV 988: Aria',
    composer: 'Johann Sebastian Bach',
    duration: '4:12',
    url: '/audio/bach-goldberg-aria.mp3'
  },
  {
    id: '14',
    title: 'Goldberg Variations, BWV 988: Variation 1',
    composer: 'Johann Sebastian Bach',
    duration: '1:54',
    url: '/audio/bach-goldberg-var1.mp3'
  },
  {
    id: '15',
    title: 'Goldberg Variations, BWV 988: Variation 2',
    composer: 'Johann Sebastian Bach',
    duration: '1:32',
    url: '/audio/bach-goldberg-var2.mp3'
  },
  {
    id: '16',
    title: 'Goldberg Variations, BWV 988: Variation 3 (Canon)',
    composer: 'Johann Sebastian Bach',
    duration: '2:18',
    url: '/audio/bach-goldberg-var3.mp3'
  },
  {
    id: '17',
    title: 'Goldberg Variations, BWV 988: Variation 4',
    composer: 'Johann Sebastian Bach',
    duration: '1:45',
    url: '/audio/bach-goldberg-var4.mp3'
  },
  {
    id: '18',
    title: 'Goldberg Variations, BWV 988: Variation 5',
    composer: 'Johann Sebastian Bach',
    duration: '1:28',
    url: '/audio/bach-goldberg-var5.mp3'
  },
  {
    id: '19',
    title: 'Goldberg Variations, BWV 988: Variation 13',
    composer: 'Johann Sebastian Bach',
    duration: '4:33',
    url: '/audio/bach-goldberg-var13.mp3'
  },
  {
    id: '20',
    title: 'Goldberg Variations, BWV 988: Variation 15 (Canon)',
    composer: 'Johann Sebastian Bach',
    duration: '3:52',
    url: '/audio/bach-goldberg-var15.mp3'
  },
  {
    id: '21',
    title: 'Goldberg Variations, BWV 988: Variation 25 (Adagio)',
    composer: 'Johann Sebastian Bach',
    duration: '6:42',
    url: '/audio/bach-goldberg-var25.mp3'
  },
  {
    id: '22',
    title: 'Goldberg Variations, BWV 988: Variation 30 (Quodlibet)',
    composer: 'Johann Sebastian Bach',
    duration: '2:15',
    url: '/audio/bach-goldberg-var30.mp3'
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = classicalTracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    const handleVolumeChange = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && volume < 1) {
        const newVolume = Math.min(volume + 0.1, 1);
        setVolume(newVolume);
        if (audio) audio.volume = newVolume;
      } else if (e.key === 'ArrowDown' && volume > 0) {
        const newVolume = Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        if (audio) audio.volume = newVolume;
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'F1' || e.code === 'F1') {
        // Action button press
        e.preventDefault();
        togglePlayPause();
      }
    };

    // Custom action button handler
    const handleActionButton = () => {
      togglePlayPause();
    };

    audio.addEventListener('ended', handleEnded);
    window.addEventListener('keydown', handleVolumeChange);
    window.addEventListener('actionbutton', handleActionButton);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('keydown', handleVolumeChange);
      window.removeEventListener('actionbutton', handleActionButton);
    };
  }, [volume, isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * classicalTracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % classicalTracks.length;
      setCurrentTrackIndex(nextIndex);
    }
  };

  const previousTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * classicalTracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      const prevIndex = currentTrackIndex === 0 ? classicalTracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card/30 border border-border/20 backdrop-blur-sm shadow-card">
        <div className="p-6 space-y-6">
          <audio
            ref={audioRef}
            src={currentTrack.url}
            loop={isLooping && !isShuffled}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Track Info */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-serif text-foreground leading-tight">{currentTrack.title}</h2>
            <p className="text-muted-foreground font-serif italic">{currentTrack.composer}</p>
            <p className="text-sm text-muted-foreground">{currentTrack.duration}</p>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="minimal"
              size="icon"
              onClick={previousTrack}
              className="rounded-full"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="control"
              size="lg"
              onClick={togglePlayPause}
              className="rounded-full w-16 h-16"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            
            <Button
              variant="minimal"
              size="icon"
              onClick={nextTrack}
              className="rounded-full"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShuffle}
              className={`text-muted-foreground hover:text-foreground ${isShuffled ? 'text-primary' : ''}`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLoop}
              className={`text-muted-foreground hover:text-foreground ${isLooping ? 'text-primary' : ''}`}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <div className="flex-1 max-w-32">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  setIsMuted(newVolume === 0);
                }}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Status */}
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              Track {currentTrackIndex + 1} of {classicalTracks.length}
              {isLooping && !isShuffled && ' • Repeating'}
              {isShuffled && ' • Shuffled'}
            </span>
          </div>
        </div>
      </Card>

      <TrackList
        tracks={classicalTracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={selectTrack}
        isVisible={showTrackList}
        onToggle={() => setShowTrackList(!showTrackList)}
      />
    </div>
  );
};