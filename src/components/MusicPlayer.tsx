import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrackList } from '@/components/TrackList';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

import type { Track, MusicCollection } from '@/data/tracks';
import { musicCollections } from '@/data/tracks';

// Tracks moved to shared data module '@/data/tracks'

// Tracks moved to shared data module '@/data/tracks'

// Collections imported from shared data module

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      // Ensure sources are (re)loaded before play
      try { audio.load(); } catch {}
      // Small delay to prevent AbortError when switching tracks rapidly
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.error('Playback error:', err);
            const name = (err as any)?.name || '';
            if (name === 'NotAllowedError') {
              setAudioError('Click to enable audio playback');
            } else if (name === 'AbortError') {
              return; // benign
            } else {
              setAudioError('Unable to play this track (format or network issue)');
            }
            setIsPlaying(false);
          });
        }
      }, 50);
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
    setCurrentTime(0);
  };

  const previousTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * currentCollection.tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      const prevIndex = currentTrackIndex === 0 ? currentCollection.tracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
    }
    setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    onTrackSelect?.(index);
    // reset time for new track
    setCurrentTime(0);
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
      const audio = audioRef.current;
      if (audio && isPlaying) {
        // Smooth fade out over 3 seconds
        const steps = 15;
        const totalMs = 3000;
        const startVol = audio.volume;
        let count = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          count += 1;
          const newVol = Math.max(0, startVol * (1 - count / steps));
          audio.volume = newVol;
          if (count >= steps) {
            clearInterval(fadeIntervalRef.current!);
            audio.pause();
            setIsPlaying(false);
            // restore user volume setting
            audio.volume = isMuted ? 0 : volume;
          }
        }, totalMs / steps);
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
            onPlay={() => {
              console.log(`🎵 Playing: ${currentTrack.title} (${localFile || currentTrack.url || currentTrack.sources?.[0]?.src || 'n/a'})`);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => console.log(`📥 Loading: ${currentTrack.title} from ${localFile || currentTrack.url || currentTrack.sources?.[0]?.src || 'n/a'}`)}
            onError={(e) => console.error(`❌ Audio error for ${currentTrack.title}:`, e)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            preload="metadata"
            src={localFile || currentTrack.sources?.[0]?.src || currentTrack.url || undefined}
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
              <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded border border-destructive/20 animate-fade-in">
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

          {/* Progress */}
          <div className="space-y-1 px-6">
            <input
              type="range"
              min={0}
              max={Math.max(1, duration)}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => {
                const t = parseFloat(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = t;
                }
                setCurrentTime(t);
              }}
              className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{`${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}</span>
              <span>{`${Math.floor((duration || 0) / 60)}:${String(Math.floor((duration || 0) % 60)).padStart(2, '0')}`}</span>
            </div>
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

          {/* Silence Timer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Silence in</p>
            <div className="flex justify-center space-x-2">
              <Button
                variant={sleepTimer === 1 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 1 ? clearSleepTimer() : setSleepTimerMinutes(1)}
                className="text-xs px-3 py-1 h-auto hover-scale"
              >
                1 min
              </Button>
              <Button
                variant={sleepTimer === 5 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 5 ? clearSleepTimer() : setSleepTimerMinutes(5)}
                className="text-xs px-3 py-1 h-auto hover-scale"
              >
                5 min
              </Button>
              <Button
                variant={sleepTimer === 15 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => sleepTimer === 15 ? clearSleepTimer() : setSleepTimerMinutes(15)}
                className="text-xs px-3 py-1 h-auto hover-scale"
              >
                15 min
              </Button>
            </div>
            {timerActive && (
              <p className="text-xs text-primary">Silencing in {sleepTimer} minute{sleepTimer !== 1 ? 's' : ''}</p>
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