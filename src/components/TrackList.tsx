import React from 'react';
import { Card } from '@/components/ui/card';

interface Track {
  id: string;
  title: string;
  composer: string;
  duration: string;
  url: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  return (
    <Card className="bg-card/60 border border-border/30 backdrop-blur-xl shadow-float overflow-hidden">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground tracking-tight">Track List</h3>
          <span className="text-xs text-muted-foreground font-medium px-3 py-1 bg-muted/30 rounded-full">{tracks.length} tracks</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1 -mr-1 scrollbar-thin">
          {tracks.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;
            
            return (
              <button
                key={track.id}
                onClick={() => onTrackSelect(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 active:scale-98 ${
                  isCurrentTrack
                    ? 'bg-primary/15 border border-primary/40 text-foreground shadow-elegant scale-[1.02]'
                    : 'bg-muted/10 hover:bg-muted/30 border border-transparent text-muted-foreground hover:text-foreground hover:border-border/20'
                }`}
              >
                <div className="space-y-1.5">
                  <h4 className="text-sm font-medium leading-tight">{track.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-xs opacity-70">{track.composer}</p>
                    <p className="text-xs opacity-50 font-mono">{track.duration}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};