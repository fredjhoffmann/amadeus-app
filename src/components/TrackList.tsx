import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Music } from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(0);
  const tracksPerPage = 5;
  const totalPages = Math.ceil(tracks.length / tracksPerPage);
  
  const getCurrentPageTracks = () => {
    const startIndex = currentPage * tracksPerPage;
    return tracks.slice(startIndex, startIndex + tracksPerPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="bg-card/30 border border-border/20 backdrop-blur-sm shadow-card">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-foreground">Track List</h3>
          <span className="text-xs text-muted-foreground">{tracks.length} tracks</span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {getCurrentPageTracks().map((track, index) => {
            const globalIndex = currentPage * tracksPerPage + index;
            const isCurrentTrack = globalIndex === currentTrackIndex;
            
            return (
              <button
                key={track.id}
                onClick={() => onTrackSelect(globalIndex)}
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 border-t border-border/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="text-xs text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};