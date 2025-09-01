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
    <Card className="bg-card/30 border border-border/20 backdrop-blur-sm shadow-card">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-foreground">Track List</h3>
          <span className="text-xs text-muted-foreground">{tracks.length} tracks</span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {tracks.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;
            
            return (
              <button
                key={track.id}
                onClick={() => onTrackSelect(index)}
                className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                  isCurrentTrack
                    ? 'bg-primary/20 border border-primary/30 text-foreground'
                    : 'bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-serif leading-tight">{track.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-xs opacity-80">{track.composer}</p>
                    <p className="text-xs opacity-60">{track.duration}</p>
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