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

const classicalTracks: Track[] = [
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    duration: '5:03',
    url: '/audio/debussy-clair-de-lune.mp3',
    sources: [
      { type: 'audio/mpeg', src: 'https://download.stream.publicradio.org/podcast/minnesota/classical/programs/free-downloads/2017/02/13/daily_download_20170213_128.mp3' },
      { type: 'audio/mpeg', src: '/audio/debussy-clair-de-lune.mp3' },
      { type: 'audio/m4a', src: '/audio/debussy-clair-de-lune.m4a' }
    ],
    performer: 'François-Joël Thiollier',
    source: 'YourClassical.org (Naxos)',
    license: 'Public Radio Download'
  },
  {
    id: 'chopin-nocturne',
    title: 'Nocturne in E-flat major, Op. 9, No. 2',
    composer: 'Frédéric Chopin',
    duration: '4:30',
    url: '/audio/chopin-nocturne-op9-no2.mp3',
    sources: [
      { type: 'audio/mpeg', src: 'https://download.stream.publicradio.org/podcast/minnesota/classical/programs/free-downloads/2016/02/04/daily_download_20160204_128.mp3' },
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
      { type: 'audio/ogg', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Satie_Gymnopedie_No_1.ogg' },
      { type: 'audio/mpeg', src: '/audio/satie-gymnopedie-1.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
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
  const [audioError, setAudioError] = useState<string | null>(null);
  const [localFile, setLocalFile] = useState<string | null>(null);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = classicalTracks[currentTrackIndex];

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
      // Handle browser autoplay restrictions
      audio.play().catch(err => {
        console.error('Autoplay prevented:', err);
        setAudioError('Click to enable audio playback');
        setIsPlaying(false);
      });
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
            loop={isLooping && !isShuffled}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            src={localFile || undefined}
          >
            {!localFile && currentTrack.sources?.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
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