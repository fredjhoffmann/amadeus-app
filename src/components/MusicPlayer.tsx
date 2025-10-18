import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrackList } from '@/components/TrackList';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from 'lucide-react';

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
  const [isLooping, setIsLooping] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [localFile, setLocalFile] = useState<string | null>(null);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayNextRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const sleepEndTimeRef = useRef<number | null>(null);

  const currentCollection = musicCollections[currentCollectionIndex];
  const currentTrack = currentCollection.tracks[currentTrackIndex];


  // Update Media Session metadata when track changes
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.composer,
        album: currentCollection.name,
        artwork: [
          { src: '/favicon.ico', sizes: '96x96', type: 'image/x-icon' }
        ]
      });

      // Set up media session action handlers
      navigator.mediaSession.setActionHandler('play', () => {
        if (!isPlaying) togglePlayPause();
      });
      
      navigator.mediaSession.setActionHandler('pause', () => {
        if (isPlaying) togglePlayPause();
      });
      
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        previousTrack();
      });
      
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        nextTrack(true);
      });

      // Update playback state
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [currentTrack, currentCollection, isPlaying]);

  // Load audio sources when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    console.log(`🔄 Loading track: ${currentTrack.title}`);
    console.log(`🔗 URL:`, currentTrack.url);
    
    setAudioError(null);
    setIsPlaying(false);
    
    // Direct src assignment for single MP3 files - much more reliable
    audio.src = currentTrack.url;
    audio.load();
  }, [currentTrackIndex, currentCollectionIndex, currentTrack]);

  // Keyboard and action button handlers
  useEffect(() => {
    const handleVolumeChange = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && volume < 1) {
        const newVolume = Math.min(volume + 0.1, 1);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
      } else if (e.key === 'ArrowDown' && volume > 0) {
        const newVolume = Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'F1' || e.code === 'F1') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    const handleActionButton = () => {
      togglePlayPause();
    };

    window.addEventListener('keydown', handleVolumeChange);
    window.addEventListener('actionbutton', handleActionButton);

    return () => {
      window.removeEventListener('keydown', handleVolumeChange);
      window.removeEventListener('actionbutton', handleActionButton);
    };
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setAudioError(null);
        console.log(`▶️ Attempting to play: ${currentTrack.title}`);
        
        // Check if audio is ready
        if (audio.readyState < 2) { // HAVE_CURRENT_DATA
          console.log('Audio not ready, loading...');
          audio.load();
          await new Promise((resolve) => {
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay);
              resolve(true);
            };
            audio.addEventListener('canplay', onCanPlay);
          });
        }
        
        await audio.play();
        setIsPlaying(true);
        console.log(`✅ Successfully playing: ${currentTrack.title}`);
      } catch (err) {
        console.error('Playback error:', err);
        const name = (err as any)?.name || '';
        if (name === 'NotAllowedError') {
          setAudioError('Click to enable audio playback (browser requires user interaction)');
        } else if (name === 'AbortError') {
          console.log('Play aborted (likely due to rapid track switching)');
          return;
        } else {
          setAudioError(`Cannot play "${currentTrack.title}" - ${err.message || 'format or network issue'}`);
        }
        setIsPlaying(false);
      }
    }
  };

  const nextTrack = (autoplay: boolean = false) => {
    console.log('🚀 Next track requested, autoplay:', autoplay);
    autoPlayNextRef.current = autoplay;
    const nextIndex = (currentTrackIndex + 1) % currentCollection.tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    onTrackSelect?.(nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? currentCollection.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    console.log('🎯 Track selected:', index);
    wasPlayingRef.current = isPlaying;
    autoPlayNextRef.current = isPlaying;
    setCurrentTrackIndex(index);
    onTrackSelect?.(index);
    setCurrentTime(0);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };


  const toggleMute = () => {
    setIsMuted(!isMuted);
  };


  const setSleepTimerMinutes = (minutes: number) => {
    // Clear existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    setSleepTimer(minutes);
    setTimerActive(true);
    
    // Store target end time for background-safe calculation
    const endTime = Date.now() + (minutes * 60 * 1000);
    sleepEndTimeRef.current = endTime;
    
    // Start countdown interval that calculates remaining time from target
    countdownRef.current = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      setRemainingTime(remaining);
      
      if (remaining <= 0) {
        clearInterval(countdownRef.current!);
        
        const audio = audioRef.current;
        if (audio && !audio.paused) {
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
        setRemainingTime(0);
        sleepEndTimeRef.current = null;
      }
    }, 1000);
  };

  const clearSleepTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    setSleepTimer(null);
    setTimerActive(false);
    setRemainingTime(0);
    sleepEndTimeRef.current = null;
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-card/60 border border-border/30 backdrop-blur-xl shadow-float">
        <div className="p-8 space-y-8">
          <audio
            ref={audioRef}
            loop={isLooping}
            onPlay={() => {
              console.log(`🎵 Playing: ${currentTrack.title}`);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => console.log(`📥 Loading: ${currentTrack.title}`)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onEnded={() => {
              console.log('🏁 Track ended');
              if (isLooping) {
                console.log('🔄 Looping track');
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().catch(err => {
                    console.error('Loop play failed:', err);
                    setAudioError('Playback failed');
                  });
                }
              } else {
                console.log('➡️ Advancing to next track with autoplay');
                nextTrack(true);
              }
            }}
            onError={(e) => {
              console.error('Audio error for track:', currentTrack.title, e);
              setAudioError(`Cannot load "${currentTrack.title}" - file may be missing or corrupted`);
              setIsPlaying(false);
            }}
            onCanPlay={() => {
              console.log(`✅ Can play: ${currentTrack.title}`);
              setAudioError(null);
              
              // Auto-play if explicitly requested
              if (autoPlayNextRef.current) {
                console.log('🎬 Auto-playing after load');
                autoPlayNextRef.current = false;
                
                audioRef.current?.play().catch(err => {
                  console.error('Auto-play failed:', err);
                  const name = (err as any)?.name || '';
                  if (name === 'NotAllowedError') {
                    setAudioError('Click to enable audio playback (browser requires user interaction)');
                  } else {
                    setAudioError('Auto-play failed - click play to continue');
                  }
                  setIsPlaying(false);
                });
              }
            }}
            onLoadedData={() => {
              console.log(`📊 Loaded data for: ${currentTrack.title}`);
              setDuration(audioRef.current?.duration || 0);
            }}
            preload="metadata"
          >
            {/* Audio sources handled by direct src assignment in useEffect */}
          </audio>
          
          {/* Track Info */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-semibold text-foreground leading-tight tracking-tight">{currentTrack.title}</h2>
            <p className="text-muted-foreground font-medium">{currentTrack.composer}</p>
            <p className="text-sm text-muted-foreground/70 font-mono">{currentTrack.duration}</p>
            
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
          <div className="flex items-center justify-center space-x-6">
            <Button
              variant="minimal"
              size="icon"
              onClick={previousTrack}
              className="rounded-full h-12 w-12"
            >
              <SkipBack className="h-6 w-6" strokeWidth={2.5} />
            </Button>
            
            <Button
              variant="control"
              size="lg"
              onClick={togglePlayPause}
              className="rounded-full w-20 h-20 shadow-glow hover:shadow-float active:scale-90"
            >
              {isPlaying ? (
                <Pause className="h-9 w-9" strokeWidth={2.5} />
              ) : (
                <Play className="h-9 w-9 ml-1" strokeWidth={2.5} />
              )}
            </Button>
            
            <Button
              variant="minimal"
              size="icon"
              onClick={() => nextTrack(true)}
              className="rounded-full h-12 w-12"
            >
              <SkipForward className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLoop}
              className={`transition-all duration-200 rounded-full ${
                isLooping 
                  ? 'text-primary hover:text-primary/80' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={isLooping}
              aria-label={isLooping ? "Disable repeat" : "Enable repeat"}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-2 px-4">
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
              className="w-full h-1.5 bg-secondary/50 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground/70 font-mono">
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
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Silence in</p>
            <div className="flex justify-center space-x-3">
              <Button
                variant={sleepTimer === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => sleepTimer === 1 ? clearSleepTimer() : setSleepTimerMinutes(1)}
                className="text-xs px-4 py-2 h-8 min-w-[60px] transition-all duration-200 hover:scale-105"
              >
                1 min
              </Button>
              <Button
                variant={sleepTimer === 5 ? "default" : "outline"}
                size="sm"
                onClick={() => sleepTimer === 5 ? clearSleepTimer() : setSleepTimerMinutes(5)}
                className="text-xs px-4 py-2 h-8 min-w-[60px] transition-all duration-200 hover:scale-105"
              >
                5 min
              </Button>
              <Button
                variant={sleepTimer === 15 ? "default" : "outline"}
                size="sm"
                onClick={() => sleepTimer === 15 ? clearSleepTimer() : setSleepTimerMinutes(15)}
                className="text-xs px-4 py-2 h-8 min-w-[60px] transition-all duration-200 hover:scale-105"
              >
                15 min
              </Button>
              <Button
                variant={sleepTimer === 30 ? "default" : "outline"}
                size="sm"
                onClick={() => sleepTimer === 30 ? clearSleepTimer() : setSleepTimerMinutes(30)}
                className="text-xs px-4 py-2 h-8 min-w-[60px] transition-all duration-200 hover:scale-105"
              >
                30 min
              </Button>
            </div>
            {timerActive && (
              <div className="inline-flex items-center space-x-2 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>
                  {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>


          {/* Status */}
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              Track {currentTrackIndex + 1} of {currentCollection.tracks.length} • {currentCollection.name}
              {isLooping && ' • Repeating'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};