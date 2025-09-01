import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  composer: string;
  duration: string;
  url: string;
}

const classicalTracks: Track[] = [
  {
    id: '1',
    title: 'Nocturne in E-flat major, Op. 9, No. 2',
    composer: 'Frédéric Chopin',
    duration: '4:30',
    url: '/audio/chopin-nocturne.mp3'
  },
  {
    id: '2',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    duration: '5:03',
    url: '/audio/debussy-clair-de-lune.mp3'
  },
  {
    id: '3',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    duration: '3:33',
    url: '/audio/satie-gymnopedie.mp3'
  },
  {
    id: '4',
    title: 'Prelude in C Major',
    composer: 'Johann Sebastian Bach',
    duration: '2:15',
    url: '/audio/bach-prelude.mp3'
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
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
      }
    };

    audio.addEventListener('ended', handleEnded);
    window.addEventListener('keydown', handleVolumeChange);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('keydown', handleVolumeChange);
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
    const nextIndex = (currentTrackIndex + 1) % classicalTracks.length;
    setCurrentTrackIndex(nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? classicalTracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="bg-card/30 border border-border/20 backdrop-blur-sm shadow-card">
      <div className="p-6 space-y-6">
        <audio
          ref={audioRef}
          src={currentTrack.url}
          loop={isLooping}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Track Info */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-serif text-foreground">{currentTrack.title}</h2>
          <p className="text-muted-foreground font-serif italic">{currentTrack.composer}</p>
          <p className="text-sm text-muted-foreground">{currentTrack.duration}</p>
        </div>

        {/* Controls */}
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

        {/* Loop indicator */}
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            {isLooping ? '∞ Repeating' : 'Single play'}
          </span>
        </div>
      </div>
    </Card>
  );
};