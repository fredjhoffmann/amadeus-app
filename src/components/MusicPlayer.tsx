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
  sources?: { type: string; src: string }[];
  performer?: string;
  source?: string;
  license?: string;
}

interface MusicCollection {
  id: string;
  name: string;
  tracks: Track[];
}

const westClassicalTracks: Track[] = [
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    duration: '5:03',
    url: '/audio/debussy-clair-de-lune.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/debussy-clair-de-lune.mp3' },
      { type: 'audio/m4a', src: '/audio/debussy-clair-de-lune.m4a' }
    ],
    performer: 'François-Joël Thiollier',
    source: 'YourClassical.org (Naxos)',
    license: 'Public Radio Download'
  },
  {
    id: 'chopin-nocturne-op9',
    title: 'Nocturne in E-flat major, Op. 9, No. 2',
    composer: 'Frédéric Chopin',
    duration: '4:30',
    url: '/audio/chopin-nocturne-op9-no2.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/chopin-nocturne-op9-no2.mp3' }
    ],
    performer: 'Denes Varjon',
    source: 'YourClassical.org (Capriccio)',
    license: 'Public Radio Download'
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    duration: '3:33',
    url: '/audio/satie-gymnopedie-1.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/satie-gymnopedie-1.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    id: 'chopin-nocturne-cs-minor',
    title: 'Nocturne in C-sharp minor, Op. Posth.',
    composer: 'Frédéric Chopin',
    duration: '4:45',
    url: '/audio/chopin-nocturne-cs-minor.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/chopin-nocturne-cs-minor.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'debussy-reverie',
    title: 'Rêverie, L. 68',
    composer: 'Claude Debussy',
    duration: '4:20',
    url: '/audio/debussy-reverie.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/debussy-reverie.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'schumann-traumerei',
    title: 'Träumerei, Op. 15 No. 7',
    composer: 'Robert Schumann',
    duration: '2:30',
    url: '/audio/schumann-traumerei.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/schumann-traumerei.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'ravel-pavane',
    title: 'Pavane pour une infante défunte',
    composer: 'Maurice Ravel',
    duration: '6:30',
    url: '/audio/ravel-pavane.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ravel-pavane.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'field-nocturne-5',
    title: 'Nocturne No. 5 in B-flat major',
    composer: 'John Field',
    duration: '4:15',
    url: '/audio/field-nocturne-5.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/field-nocturne-5.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'liszt-consolation-3',
    title: 'Consolation No. 3 in D-flat major',
    composer: 'Franz Liszt',
    duration: '4:00',
    url: '/audio/liszt-consolation-3.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/liszt-consolation-3.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'beethoven-moonlight',
    title: 'Moonlight Sonata (1st Movement), Op. 27 No. 2',
    composer: 'Ludwig van Beethoven',
    duration: '5:30',
    url: '/audio/beethoven-moonlight.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/beethoven-moonlight.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'mendelssohn-song-without-words',
    title: 'Song Without Words, Op. 30 No. 6 (Venetian Boat Song)',
    composer: 'Felix Mendelssohn',
    duration: '2:45',
    url: '/audio/mendelssohn-song-without-words.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/mendelssohn-song-without-words.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  }
];

const worldwideBedtimeTracks: Track[] = [
  {
    id: 'rokudan-no-shirabe',
    title: 'Rokudan no Shirabe',
    composer: 'Yatsuhashi Kengyō (Traditional Japanese)',
    duration: '6:00',
    url: '/audio/rokudan-no-shirabe.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/rokudan-no-shirabe.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'high-mountains-flowing-water',
    title: 'High Mountains and Flowing Water (Gao Shan Liu Shui)',
    composer: 'Bo Ya (Traditional Chinese)',
    duration: '5:30',
    url: '/audio/high-mountains-flowing-water.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/high-mountains-flowing-water.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'raga-yaman',
    title: 'Raga Yaman',
    composer: 'Traditional Indian Classical',
    duration: '8:00',
    url: '/audio/raga-yaman.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/raga-yaman.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'shur-santur',
    title: 'Shur (Dastgah-e Shur)',
    composer: 'Traditional Persian',
    duration: '6:45',
    url: '/audio/shur-santur.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/shur-santur.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'alf-leila-wa-leila',
    title: 'Alf Leila Wa Leila (One Thousand and One Nights)',
    composer: 'Traditional Arabic',
    duration: '5:15',
    url: '/audio/alf-leila-wa-leila.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/alf-leila-wa-leila.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'ney-taksimi',
    title: 'Ney Taksimi (Improvisation)',
    composer: 'Traditional Turkish',
    duration: '4:30',
    url: '/audio/ney-taksimi.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ney-taksimi.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'arirang',
    title: 'Arirang',
    composer: 'Traditional Korean',
    duration: '4:00',
    url: '/audio/arirang.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/arirang.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'puspanjali',
    title: 'Puspanjali',
    composer: 'Traditional Balinese',
    duration: '7:00',
    url: '/audio/puspanjali.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/puspanjali.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'lao-duang-duean',
    title: 'Lao Duang Duean',
    composer: 'H.R.H. Prince Benbhadanabhongse (Traditional Thai)',
    duration: '5:45',
    url: '/audio/lao-duang-duean.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/lao-duang-duean.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'ladrang-wilujeng',
    title: 'Ladrang Wilujeng',
    composer: 'Traditional Javanese',
    duration: '6:30',
    url: '/audio/ladrang-wilujeng.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ladrang-wilujeng.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  }
];

const musicCollections: MusicCollection[] = [
  {
    id: 'western-classical',
    name: 'Western Classical',
    tracks: westClassicalTracks
  },
  {
    id: 'worldwide-bedtime',
    name: 'Worldwide Bedtime',
    tracks: worldwideBedtimeTracks
  }
];

interface MusicPlayerProps {
  currentCollectionIndex?: number;
  currentTrackIndex?: number;
  onCollectionChange?: (index: number) => void;
  onTrackSelect?: (index: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentCollectionIndex: externalCollectionIndex,
  currentTrackIndex: externalTrackIndex,
  onCollectionChange,
  onTrackSelect,
}) => {
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(externalCollectionIndex || 0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(externalTrackIndex || 0);

  // Sync with external props
  React.useEffect(() => {
    if (externalCollectionIndex !== undefined) {
      setCurrentCollectionIndex(externalCollectionIndex);
    }
  }, [externalCollectionIndex]);

  React.useEffect(() => {
    if (externalTrackIndex !== undefined) {
      setCurrentTrackIndex(externalTrackIndex);
    }
  }, [externalTrackIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [localFile, setLocalFile] = useState<string | null>(null);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentCollection = musicCollections[currentCollectionIndex];
  const currentTrack = currentCollection.tracks[currentTrackIndex];


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(err => {
          console.error('Audio play failed:', err);
          setAudioError('Playback failed');
        });
      } else {
        nextTrack();
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setAudioError('Audio file not found or cannot be loaded');
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setAudioError(null);
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
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    window.addEventListener('keydown', handleVolumeChange);
    window.addEventListener('actionbutton', handleActionButton);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
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
      // Handle browser autoplay restrictions and other playback issues
      setAudioError(null);
      // Add small delay to prevent AbortError when switching tracks rapidly
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.error('Playback error:', err);
            const name = (err as any)?.name || '';
            if (name === 'NotAllowedError') {
              setAudioError('Click to enable audio playback');
            } else if (name === 'AbortError') {
              // Ignore AbortError - it's just from rapid track changes
              return;
            } else {
              setAudioError('Unable to play this track (format or network issue)');
            }
            setIsPlaying(false);
          });
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * currentCollection.tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % currentCollection.tracks.length;
      setCurrentTrackIndex(nextIndex);
    }
  };

  const previousTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * currentCollection.tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      const prevIndex = currentTrackIndex === 0 ? currentCollection.tracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    onTrackSelect?.(index);
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

  const handleLocalFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setLocalFile(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  };

  const setSleepTimerMinutes = (minutes: number) => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setSleepTimer(minutes);
    setTimerActive(true);
    
    // Set new timer
    timerRef.current = setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setTimerActive(false);
      setSleepTimer(null);
    }, minutes * 60 * 1000);
  };

  const clearSleepTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSleepTimer(null);
    setTimerActive(false);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card/30 border border-border/20 backdrop-blur-sm shadow-card">
        <div className="p-6 space-y-6">
          <audio
            ref={audioRef}
            key={`${currentCollectionIndex}-${currentTrackIndex}`}
            loop={isLooping && !isShuffled}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            src={localFile || undefined}
          >
            {!localFile && currentTrack.sources?.map((source, index) => (
              <source key={`${source.src}-${index}`} src={source.src} type={source.type} />
            ))}
            {/* Fallback for tracks without sources array */}
            {!localFile && !currentTrack.sources && <source src={currentTrack.url} type="audio/mpeg" />}
          </audio>
          
          {/* Track Info */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-serif text-foreground leading-tight">{currentTrack.title}</h2>
            <p className="text-muted-foreground font-serif italic">{currentTrack.composer}</p>
            <p className="text-sm text-muted-foreground">{currentTrack.duration}</p>
            
            {audioError && (
              <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded border border-destructive/20">
                ⚠️ {audioError}
              </div>
            )}
            
            {localFile && (
              <div className="text-xs text-primary bg-primary/10 px-3 py-2 rounded border border-primary/20">
                🎵 Playing local file
              </div>
            )}
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

          {/* Sleep Timer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Sleep Timer</p>
            <div className="flex justify-center space-x-2">
              <Button
                variant={sleepTimer === 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 1 ? clearSleepTimer() : setSleepTimerMinutes(1)}
                className="text-xs px-3 py-1 h-auto"
              >
                1min
              </Button>
              <Button
                variant={sleepTimer === 5 ? "default" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 5 ? clearSleepTimer() : setSleepTimerMinutes(5)}
                className="text-xs px-3 py-1 h-auto"
              >
                5min
              </Button>
              <Button
                variant={sleepTimer === 15 ? "default" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 15 ? clearSleepTimer() : setSleepTimerMinutes(15)}
                className="text-xs px-3 py-1 h-auto"
              >
                15min
              </Button>
            </div>
            {timerActive && (
              <p className="text-xs text-primary">Timer set for {sleepTimer} minute{sleepTimer !== 1 ? 's' : ''}</p>
            )}
          </div>

          {/* Local File Upload */}
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleLocalFile}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              📂 Load local MP3
            </Button>
          </div>

          {/* Status */}
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              Track {currentTrackIndex + 1} of {currentCollection.tracks.length} • {currentCollection.name}
              {isLooping && !isShuffled && ' • Repeating'}
              {isShuffled && ' • Shuffled'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};